import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError.js";
import { supabase } from "../config/supabaseClient.js";

interface Item {
  title: string;
  description: string;
  price: string;
}

interface Section {
  header: string;
  section_order: number;
  items: Item[];
}

interface Template {
  name: string;
  user_id: number;
  sections: Section[];
}


export const getAllMenuTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await supabase.from("templates").select("*").eq("user_id", 1);

    if (error) {
      return next(ApiError.internal("Error retrieving templates data"));
    }

    if (!data || data.length === 0) {
      return next(ApiError.notFound("Templates not found"));
    }

    res.status(200).json({
      message: "Templates retrieved successfully.",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getMenuById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(ApiError.badRequest("Menu id must be provided!"));
    }

    // Fetch template with related sections and items
    const { data, error } = await supabase
      .from("templates")
      .select(`
        id,
        name,
        created_at,
        updated_at,
        user_id,
        template_sections (
          section_id,
          header,
          section_order,
          template_id,
          template_items (
            item_id,
            title,
            description,
            price
          )
        )
      `)
      .eq("id", id);

    if (error) {
      return next(ApiError.internal("Error retrieving template data: " + error.message));
    }

    if (!data || data.length === 0) {
      return next(ApiError.notFound(`Template with ID: ${id} not found.`));
    }

    res.status(200).json({
      message: "Template retrieved successfully.",
      payload: data[0], // Return the first result since IDs are unique
    });
  } catch (error) {
    console.error(error);
    next(ApiError.internal("Unexpected error while retrieving template data"));
  }
};

export const createMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, user_id, sections }: Template = req.body;

  if (!name || !user_id || !sections || sections.length === 0) {
    return next(ApiError.badRequest("Missing required fields!"));
  }

  const supabaseClient = supabase;

  try {
    // Insert into templates table
    const { data: templateData, error: templateError } = await supabaseClient
      .from("templates")
      .insert([{ name, user_id }])
      .select();

    if (templateError) {
      return next(ApiError.internal("Error creating template"));
    }

    const templateId = templateData[0].id; // Newly created template ID

    // Prepare and insert sections into template_sections table
    const sectionData = sections.map((section) => ({
      template_id: templateId,
      header: section.header,
      section_order: section.section_order,
    }));

    const { data: sectionsData, error: sectionsError } = await supabaseClient
      .from("template_sections")
      .insert(sectionData)
      .select();

    if (sectionsError) {
      return next(ApiError.internal("Error creating sections"));
    }

    // Prepare and insert items into template_items table
    const itemsData = sections.flatMap((section, index) =>
      section.items.map((item) => ({
        section_id: sectionsData[index].section_id,
        title: item.title,
        description: item.description,
        price: item.price,
      }))
    );

    const { error: itemsError } = await supabaseClient
      .from("template_items")
      .insert(itemsData);

    if (itemsError) {
      return next(ApiError.internal("Error creating items"));
    }

    res.status(201).json({
      message: "Menu template created successfully.",
      template_id: templateId,
    });
  } catch (error) {
    console.error(error);
    next(ApiError.internal("Unexpected error while creating template"));
  }
};

export const updateMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, sections } = req.body;
    const userId = req.user?.id;

    if (!id || !name || !sections) {
      return next(ApiError.badRequest("Missing required fields!"));
    }

    const { error, data } = await supabase
      .from("templates")
      .update({ name, sections })
      .eq("id", id)
      .eq("user_id", userId)
      .select();

    if (error) {
      return next(ApiError.internal("Error updating menu template"));
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      return next(ApiError.notFound("Menu template not found"));
    }

    res.status(200).json({
      message: "Menu template updated successfully.",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!id) {
      return next(ApiError.badRequest("Template ID must be provided"));
    }

    const { error, count } = await supabase
      .from("templates")
      .delete()
      .eq("template_id", id)
      .eq("user_id", userId);

    if (error) {
      return next(ApiError.internal("Error deleting menu template"));
    }

    if (count === 0) {
      return next(ApiError.notFound("Menu template not found"));
    }

    res.status(200).json({
      message: `Template with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};
export const copyMenuTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.body;
  const userId = req.user?.id;

  try {
    // Validate the templateId
    if (!templateId) {
      return next(ApiError.badRequest("Template ID is required!"));
    }

    // Validate the userId
    if (!userId) {
      return next(ApiError.unauthorized("User ID is required!"));
    }

    // Fetch the original template
    const { data: originalTemplate, error } = await supabase
      .from("templates")
      .select("*")
      .eq("id", templateId)
      .single();

    if (error) {
      return next(ApiError.internal(`Error retrieving original template: ${error.message}`));
    }

    if (!originalTemplate) {
      return next(ApiError.notFound("Menu template not found!"));
    }

    // Create a copy of the original template
    const { data: newTemplate, error: insertError } = await supabase
      .from("templates")
      .insert([
        {
          name: `${originalTemplate.name} (Copy)`, // Append "(Copy)" to the name
          user_id: userId, // Assign the new user ID
          created_at: new Date(), // Add timestamps
          updated_at: new Date(),
        },
      ])
      .select();

    if (insertError) {
      return next(ApiError.internal(`Error copying template: ${insertError.message}`));
    }

    res.status(201).json({
      message: "Template copied successfully.",
      payload: newTemplate,
    });
  } catch (error) {
    console.error(error);
    next(ApiError.badRequest("Failed to copy template."));
  }
};
export const getAllUserMenus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if(!userId){
      return next(ApiError.badRequest("Please login first!"))
    }
    const { data, error } = await supabase.from("templates").select("*").eq("user_id", userId);

    if (error) {
      return next(ApiError.internal("Error retrieving templates data: "+error.message));
    }

    if (!data || data.length === 0) {
      return next(ApiError.notFound("Templates not found"));
    }

    res.status(200).json({
      message: "Templates retrieved successfully.",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};