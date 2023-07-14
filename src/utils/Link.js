"use client";
import { useRouter } from "next/navigation";

export default function Link({ href, children, ...rest }) {
  const router = useRouter();

  function handleClick(e) {
    e.preventDefault();

    if (!document.startViewTransition) {
      router.push(href);
      return;
    }

    document.startViewTransition(() => {
      router.push(href);
    });
  }
  return (
    <a href={href} onClick={(e) => handleClick(e)} {...rest}>
      {children}
    </a>
  );
}
