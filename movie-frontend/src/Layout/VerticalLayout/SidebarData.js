const SidebarData = [
  {
    label: "Menu",
    isMainMenu: true,
  },
  {
    label: "Movie",
    icon: "bx bxs-folder-open",
    subItem: [
      { sublabel: "Movies", link: "/movies" },
      { sublabel: "Add Movie", link: "/add-movie" },
    ],
  },
];
export default SidebarData;
