import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";
import { getNotifications } from "@/lib/server-actions";

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // get the user from the server

  const authenticatedUser = await auth();
  const notifications = await getNotifications();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Navbar
          notifications={notifications}
          authenticatedUser={authenticatedUser}
        />
        {children}
      </body>
    </html>
  );
};

export default HomeLayout;
