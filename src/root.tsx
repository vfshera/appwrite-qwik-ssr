import { component$, isDev } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head";
import bgImage from "~/assets/images/login-dark-mode.png";
import AppwriteLogoDark from "~/assets/images/appwrite-logo-dark.svg?jsx";
import "./global.css";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en" class="theme-dark">
        <main class="grid-1-1 is-full-page" id="main">
          <section
            class="u-flex u-flex-vertical"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div class="tag-line is-not-mobile">
              <p>
                Appwrite Server Side Rendering<span class="underscore">_</span>
              </p>
            </div>
            <div class="u-flex u-stretch" />
            <div class="logo u-flex u-gap-16">
              <a href="/">
                <AppwriteLogoDark width="160" class="u-block" />
              </a>
            </div>
          </section>
          <section class="grid-1-1-col-2 u-flex u-main-center u-cross-center _u-padding-16-mobile">
            <div class="container u-flex u-flex-vertical u-cross-center u-main-center">
              <RouterOutlet />
            </div>
          </section>
        </main>
      </body>
    </QwikCityProvider>
  );
});
