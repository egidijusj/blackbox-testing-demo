import "./base.css";
import "./index.css";
import ReactApp from "./react";
import VueApp from "./vue";

const renderVue = window.location.search.includes("vue");

const todos = [
  { name: "code app in react", completed: true },
  { name: "blackbox-test it", completed: true },
  { name: "rewrite app in vue", completed: renderVue },
  { name: "profit!", completed: false }
];

const App = renderVue ? VueApp : ReactApp;
App(document.getElementById("react"), { todos });
