import { Sidebar } from "@/common/Sidebar/Sidebar"
import { Flex } from "@mantine/core"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex direction="row" justify="flex-start" align="stretch" style={{ height: "100%", width: "100%" }}>
        <Sidebar />
        <main style={{ height: '100%', width: '100%' }}>{children}</main>
      </Flex>
    </>
  )
}