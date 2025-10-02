import { FloatingDock } from "../ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";


export function FloatingItems(
  {
    className,
  }
) {
  const links = [
    {
      title: "Github",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/Ankush-25",
      target: "_blank",
      rel: "noopener noreferrer"
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/ankit-bhandari25/",
      target: "_blank",
      rel: "noopener noreferrer"
    },
    {
      title: "X (Twitter)",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/bhandariji1298/",
      target: "_blank",
      rel: "noopener noreferrer"
    },
    {
      title: "LeetCode",
      icon: (
        <IconBrandLeetcode className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://leetcode.com/u/Ankush-25/",
      target: "_blank",
      rel: "noopener noreferrer"
    },

    // {
    //   title: "Twitter",
    //   icon: (
    //     <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   href: "#",
    // },
    // {
    //   title: "GitHub",
    //   icon: (
    //     <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   href: "#",
    // },
  ];
  return (
    <div className="sm:flex flex-col items-center justify-center sm:h-[35rem] w-full">
      <FloatingDock
        mobileClassName="left-40 !mb-[-40px]" 
        desktopClassName={className}
        items={links}
      />
    </div>
  );
}
