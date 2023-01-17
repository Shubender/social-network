import { createRoot } from "react-dom/client";
import { App } from "./app/app";
import { Welcome } from "./welcome/welcome";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = createRoot(document.querySelector("main"));

fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        if (data.userId) {
            root.render(
                <Provider store={store}>
                    <App />
                </Provider>,
            );
        } else {
            root.render(<Welcome />);
        }
    });
