import { Sidebar } from "@/common/Sidebar/Sidebar"
import { Flex } from "@mantine/core"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex direction="row" justify="flex-start" align="stretch" style={{ height: "100%" }}>
        <Sidebar />
        <main style={{ flex: 1, height: '100%' }}>{children}</main>
      </Flex>
    </>
  )
}