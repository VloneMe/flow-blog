import { ReactNode } from "react"


interface Props {
    children: ReactNode;
    className?: string;
}


export const Container = (
    { children, className }: Props
) => {
  return (
    <div className={`max-w-[90rem] container mx-auto lg:px-3 px-4 ${className}`}
    >
        {children}
    </div>
  )
}
