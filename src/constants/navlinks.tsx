import {
  IconArticle,
  IconBolt,
  IconBriefcase2,
  IconMail,
  IconMessage2,
  IconDashboard,
} from "@tabler/icons-react";

export const navlinks = [
  {
    href: "/",
    label: "Home",
    icon: IconBolt,
  },
  {
    href: "/about",
    label: "About",
    icon: IconMessage2,
  },
  {
    href: "/projects",
    label: "Projects",
    icon: IconBriefcase2,
  },
  {
    href: "/blog",
    label: "Articles",
    icon: IconArticle,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: IconMail,
  },
];

export const adminLinks = [
  {
    href: "/admin/email-verification",
    label: "Email Verification",
    icon: IconDashboard,
    adminOnly: true,
  },
  {
    href: "/admin/verify-email",
    label: "Verify Email",
    // Using IconMail for both since IconMail2 doesn't exist in the package
    icon: IconMail,
    adminOnly: true,
  },
];
