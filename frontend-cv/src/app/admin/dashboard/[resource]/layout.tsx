export default function RootLayout({
  children,
  modal,
  form,
}: {
  children: React.ReactNode,
  modal?: React.ReactNode,
  form?: React.ReactNode
}) {
  return (
    <> 
       {modal}
       {form}
       {children}
  </>
  )
}