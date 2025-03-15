import { Paths } from "../../enums/Paths.ts";
import { A } from "@solidjs/router";
import { Offcanvas } from "bootstrap";
import { type Component, createSignal } from "solid-js";

export const MainNav: Component = () => {
  const [offcanvasInstance, setOffcanvasInstance] = createSignal<Offcanvas>();

  return (
    <nav class="navbar navbar-expand-md bg-body-tertiary sticky-top">
      <div class="container">
        <A class="navbar-brand" href={Paths.Home}>
          Asset Register
        </A>

        <button
          class="navbar-toggler"
          type="button"
          onClick={() => offcanvasInstance()?.toggle()}
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          ref={(element: HTMLDivElement) => {
            setOffcanvasInstance(new Offcanvas(element));
          }}
        >
          <div class="offcanvas-header">
            <button
              type="button"
              class="btn-close"
              onClick={() => offcanvasInstance()?.hide()}
            />
          </div>

          <div class="offcanvas-body">
            <ul
              class="navbar-nav justify-content-end flex-grow-1 pe-3"
              onClick={() => offcanvasInstance()?.hide()}
            >
              <li class="nav-item">
                <A class="nav-link" activeClass="active" href={Paths.Home} end>
                  Home
                </A>
              </li>

              <li class="nav-item">
                <A
                  class="nav-link"
                  activeClass="active"
                  href={Paths.CreateAsset}
                  end
                >
                  Create Asset
                </A>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
