// sub/foo.js
import { bar } from '../bar.js';
export function bar_via_foo() { return bar() + 1; }
export function foo() { return bar_via_foo(); }
