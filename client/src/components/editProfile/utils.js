export const options = [
  {
    label: "* Select Professional Status",
    value: 0,
  },
  {
    label: "Developer",
    value: "Developer",
  },
  {
    label: "Junior Developer",
    value: "Junior Developer",
  },
  {
    label: "Senior Developer",
    value: "Senior Developer",
  },
  {
    label: "Manager",
    value: "Manager",
  },
  {
    label: "Student or Learning",
    value: "Student or Learning",
  },
  {
    label: "Instructor or Teacher",
    value: "Instructor or Teacher",
  },
  {
    label: "Intern",
    value: "Intern",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export const initialState = {
  handle: "",
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubUsername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

export const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value,
  };
};
