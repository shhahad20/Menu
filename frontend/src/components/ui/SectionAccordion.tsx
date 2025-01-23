import Accordion from "./Accordion";
import { useDispatch, useSelector } from "react-redux";
import { fetchSectionsForTemplate, removeSection, updateSection } from "../../redux/menu/sectionSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";

interface SectionsAccordionProps {
    templateId: string | undefined;
  }

const SectionsAccordion : React.FC<SectionsAccordionProps> = ({ templateId }) => {
  const dispatch: AppDispatch = useDispatch();
  const { sections } = useSelector((state: RootState) => state.sections);

  useEffect(() => {
    if(templateId){
        dispatch(fetchSectionsForTemplate(templateId));
    }
  }, [dispatch,templateId]);

  console.log("Sections data in component:", sections); // Debug log

  
  const handleEditSection = (id: string, updatedName: string) => {
    dispatch(updateSection({ section_id: id, header: updatedName }));
  };

  const handleDeleteSection = (id: string) => {
    dispatch(removeSection(id));
  };
  return (
<Accordion
  title="Sections"
  data={sections.map((section) => ({
    id: section.section_id, // Map section_id to id
    header: section.header, // Keep header for renderContent
  }))}
  onEdit={(id, updatedValue) =>
    handleEditSection(id, updatedValue)
  }
  onDelete={(id) => handleDeleteSection(id)}
  renderContent={(item) => item.header}
/>

  );
};

export default SectionsAccordion;
