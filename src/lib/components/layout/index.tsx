import { Center } from "@chakra-ui/react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Center w="full" h="100vh" p={2}>
      {children}
    </Center>
  );
};

export default Layout;
