import { useEffect, useState } from "react";
import UserTemplate1 from "./userTemplateOne";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  fetchMenuTemplatesForUser,
  MenuTemplate,
} from "../../redux/menu/menuSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ParentComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { templates, loading, currentPage, totalPages } = useSelector(
    (state: RootState) => state.menu
  );
  const [filteredTemplates, setFilteredTemplates] = useState<MenuTemplate[]>(
    []
  );
  const [sortOrder, setsortOrder] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [page, setPage] = useState(currentPage);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);  // State to keep track of the selected template


  useEffect(() => {
    const validatedSortOrder =
      sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined;
    // Dispatch the action to fetch templates
    dispatch(
      fetchMenuTemplatesForUser({
        page,
        searchTerm,
        sortOption,
        sortOrder: validatedSortOrder,
        limit,
      })
    );
  }, [dispatch, page, searchTerm, sortOption, sortOrder, limit]);
console.log(templates)

useEffect(() => {
    if (templates) {
      const filtered = templates.filter(
        (template: MenuTemplate) =>
          template.original_id === "3491c484-c425-41b1-9537-841328278931"
      );
      setFilteredTemplates(filtered);
    }
  }, [templates]);
  console.log("filtered Templates: ", filteredTemplates)
  const handleButtonClick = (templateId: string) => {
    setSelectedTemplate(templateId);  // Set the templateId when the button is clicked
  };
  const handleOpenNewWindow = (templateId: string) => {
    const url = `/template/${templateId}`;  // Construct the URL for the template
    window.open(url, "_blank");  // Open the URL in a new window
  };
  return (
<div>
      {filteredTemplates.length > 0 ? (
        filteredTemplates.map((template) => (
          <div key={template.id}>
            <Link to={`/templates/${template.id}`} target="_blank">
              <button>
                Show Template {template.id}
              </button>
            </Link>
          </div>
        ))
      ) : (
        <p>No templates found.</p>
      )}
    </div>
  );
};

export default ParentComponent;
