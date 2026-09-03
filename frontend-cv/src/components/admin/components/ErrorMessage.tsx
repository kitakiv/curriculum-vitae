import TextGray from "@/components/text/TextGray";
import CustomizedSnackbars from "@/components/animation/Alert";

export default function ErrorMessage({ children}: { children: React.ReactNode }) {
    return (
        <>
          <TextGray tailwind="text-center">{children}</TextGray>
            <CustomizedSnackbars open={true} success={false}>
              {children}
            </CustomizedSnackbars>
        </>
      );
}