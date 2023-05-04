import { useTheme as useNextTheme } from "next-themes";
import {
  useTheme,
  Switch,
  Navbar,
  Text,
  Button,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  path: string;
}
export default function Nav() {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { title: "Dashboard", path: "/" },
    { title: "Accounts", path: "/accounts" },
    { title: "Transactions", path: "/transactions" },
    { title: "Reports", path: "/reports" },
  ];
  return (
    <Navbar
      shouldHideOnScroll
      css={{ display: "flex", justifyContent: "center" }}
      variant="sticky"
    >
      {/* header content */}
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          ACME
        </Text>
        <Navbar.Toggle showIn="xs" aria-label="toggle navigation" />
      </Navbar.Brand>
      {/* desktop content */}
      <Navbar.Content hideIn="xs" variant="underline">
        {navItems.map((item, index) => (
          <Navbar.Item
            key={index}
            id={"nav-item"}
            isActive={pathname === item.path}
          >
            <Text>{item.title}</Text>
          </Navbar.Item>
        ))}
      </Navbar.Content>
      {/* mobile content */}
      <Navbar.Collapse showIn="xs">
        {navItems.map((item, index) => (
          <Navbar.CollapseItem key={index} isActive={pathname === item.path}>
            <Link color="inherit" href={item.path}>
              {item.title}
            </Link>
          </Navbar.CollapseItem>
        ))}
        <Navbar.CollapseItem
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? (
            <Text css={{ color: "$yellow800" }}>
              <i className="fi fi-rr-brightness"></i>
            </Text>
          ) : (
            <Text css={{ color: "$blue800" }}>
              <i className="fi fi-rr-moon-stars"></i>
            </Text>
          )}
        </Navbar.CollapseItem>
      </Navbar.Collapse>
      {/* config content */}
    </Navbar>
  );
}
