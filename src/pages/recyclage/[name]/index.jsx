import React, { useEffect } from "react";
import MainProject from "@/components/main-project/MainProject";
import { useRouter } from "next/router";

const Project = ({ currentProject }) => {
  const { query, push } = useRouter();

  useEffect(() => {
    if (currentProject && query.name) {
      push(`/recyclage/${currentProject}`);
    }
  }, [currentProject, query.name]);

  return <MainProject currentProject={currentProject} />;
};

export default Project;
