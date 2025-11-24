import { test as ui } from "./pages.fixture";
import { test as api } from "./api.fixture";
import { mergeTests, expect } from "@playwright/test";
import { test as mock } from "./mock.fixture";

const test = mergeTests(api, ui, mock);

export { test, expect };
