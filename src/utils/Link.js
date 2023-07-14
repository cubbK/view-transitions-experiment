"use client";
import { useRouter } from "next/navigation";

function isBackNavigation(href) {
  const urlList = Array.from(document.querySelectorAll("header a")).map(
    (a) => a.pathname
  );

  const currentUrl = window.location.pathname;
  const currentUrlIndex = urlList.indexOf(currentUrl);
  const nextUrlIndex = urlList.indexOf(href);
  if (currentUrlIndex === -1 || nextUrlIndex === -1) {
    return false;
  }
  if (currentUrlIndex > nextUrlIndex) {
    return true;
  }
  return false;
}

export default function Link({ href, children, ...rest }) {
  const router = useRouter();

  async function handleClick(e) {
    e.preventDefault();

    if (!document.startViewTransition) {
      router.push(href);
      return;
    }

    const isBack = isBackNavigation(href);
    console.log("isBack", isBack);
    if (isBack) {
      document.getElementsByTagName("main")[0].classList.add("back-transition");
    }

    const transition = document.startViewTransition(() => {
      router.push(href);
    });

    try {
      await transition.finished;
    } finally {
      //   document
      //     .getElementsByTagName("main")[0]
      //     .classList.remove("back-transition");
    }
  }
  return (
    <a href={href} onClick={(e) => handleClick(e)} {...rest}>
      {children}
    </a>
  );
}
