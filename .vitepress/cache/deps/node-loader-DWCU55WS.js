import {
  cyan,
  init_module,
  require_browser,
  require_execa,
  require_find_up,
  require_fs,
  require_path,
  require_process,
  require_url,
  yellow
} from "./chunk-MLCEN7JF.js";
import {
  __commonJS,
  __privateAdd,
  __privateGet,
  __privateSet,
  __privateWrapper,
  __publicField,
  __toESM
} from "./chunk-KGKAZ2K7.js";

// browser-external:module
var require_module = __commonJS({
  "browser-external:module"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "module" has been externalized for browser compatibility. Cannot access "module.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/icon/defaults.mjs
var defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
var defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
var defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
var defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/customisations/defaults.mjs
var defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
var defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/svg/size.mjs
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/svg/build.mjs
var isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  attributes.viewBox = box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString();
  return {
    attributes,
    body
  };
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/icon/transformations.mjs
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/icon/merge.mjs
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/icon-set/tree.mjs
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/icon-set/get-icon.mjs
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function getIconData(data, name) {
  if (data.icons[name]) {
    return internalGetIconData(data, name, []);
  }
  const tree = getIconsTree(data, [name])[name];
  return tree ? internalGetIconData(data, name, tree) : null;
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/utils.mjs
var svgWidthRegex = /\swidth\s*=\s*["'](\w+)["']/;
var svgHeightRegex = /\sheight\s*=\s*["'](\w+)["']/;
var svgTagRegex = /<svg\s+/;
function configureSvgSize(svg, props, scale) {
  const svgNode = svg.slice(0, svg.indexOf(">"));
  const check = (prop, regex) => {
    const result = regex.exec(svgNode);
    const isSet = result != null;
    const propValue = props[prop];
    if (!propValue && !isUnsetKeyword(propValue)) {
      if (typeof scale === "number") {
        if (scale > 0) {
          props[prop] = `${scale}em`;
        }
      } else if (result) {
        props[prop] = result[1];
      }
    }
    return isSet;
  };
  return [check("width", svgWidthRegex), check("height", svgHeightRegex)];
}
async function mergeIconProps(svg, collection, icon, options, propsProvider, afterCustomizations) {
  const { scale, addXmlNs = false } = options ?? {};
  const { additionalProps = {}, iconCustomizer } = (options == null ? void 0 : options.customizations) ?? {};
  const props = await (propsProvider == null ? void 0 : propsProvider()) ?? {};
  await (iconCustomizer == null ? void 0 : iconCustomizer(collection, icon, props));
  Object.keys(additionalProps).forEach((p) => {
    const v = additionalProps[p];
    if (v !== void 0 && v !== null)
      props[p] = v;
  });
  afterCustomizations == null ? void 0 : afterCustomizations(props);
  const [widthOnSvg, heightOnSvg] = configureSvgSize(svg, props, scale);
  if (addXmlNs) {
    if (!svg.includes("xmlns=") && !props["xmlns"]) {
      props["xmlns"] = "http://www.w3.org/2000/svg";
    }
    if (!svg.includes("xmlns:xlink=") && svg.includes("xlink:") && !props["xmlns:xlink"]) {
      props["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
    }
  }
  const propsToAdd = Object.keys(props).map(
    (p) => p === "width" && widthOnSvg || p === "height" && heightOnSvg ? null : `${p}="${props[p]}"`
  ).filter((p) => p != null);
  if (propsToAdd.length) {
    svg = svg.replace(svgTagRegex, `<svg ${propsToAdd.join(" ")} `);
  }
  if (options) {
    const { defaultStyle, defaultClass } = options;
    if (defaultClass && !svg.includes("class=")) {
      svg = svg.replace(svgTagRegex, `<svg class="${defaultClass}" `);
    }
    if (defaultStyle && !svg.includes("style=")) {
      svg = svg.replace(svgTagRegex, `<svg style="${defaultStyle}" `);
    }
  }
  const usedProps = options == null ? void 0 : options.usedProps;
  if (usedProps) {
    Object.keys(additionalProps).forEach((p) => {
      const v = props[p];
      if (v !== void 0 && v !== null)
        usedProps[p] = v;
    });
    if (typeof props.width !== "undefined" && props.width !== null) {
      usedProps.width = props.width;
    }
    if (typeof props.height !== "undefined" && props.height !== null) {
      usedProps.height = props.height;
    }
  }
  return svg;
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/modern.mjs
var import_debug = __toESM(require_browser(), 1);
var debug = (0, import_debug.default)("@iconify-loader:icon");
async function searchForIcon(iconSet, collection, ids, options) {
  let iconData;
  const { customize } = (options == null ? void 0 : options.customizations) ?? {};
  for (const id of ids) {
    iconData = getIconData(iconSet, id);
    if (iconData) {
      debug(`${collection}:${id}`);
      let defaultCustomizations = { ...defaultIconCustomisations };
      if (typeof customize === "function")
        defaultCustomizations = customize(defaultCustomizations);
      const {
        attributes: { width, height, ...restAttributes },
        body
      } = iconToSVG(iconData, defaultCustomizations);
      const scale = options == null ? void 0 : options.scale;
      return await mergeIconProps(
        // DON'T remove space on <svg >
        `<svg >${body}</svg>`,
        collection,
        id,
        options,
        () => {
          return { ...restAttributes };
        },
        (props) => {
          const check = (prop, defaultValue) => {
            const propValue = props[prop];
            let value;
            if (!isUnsetKeyword(propValue)) {
              if (propValue) {
                return;
              }
              if (typeof scale === "number") {
                if (scale) {
                  value = `${scale}em`;
                }
              } else {
                value = defaultValue;
              }
            }
            if (!value) {
              delete props[prop];
            } else {
              props[prop] = value;
            }
          };
          check("width", width);
          check("height", height);
        }
      );
    }
  }
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/fs.mjs
var import_fs5 = __toESM(require_fs(), 1);

// node_modules/.pnpm/local-pkg@0.4.3/node_modules/local-pkg/index.mjs
var import_path3 = __toESM(require_path(), 1);
var import_fs3 = __toESM(require_fs(), 1);
var import_module = __toESM(require_module(), 1);

// node_modules/.pnpm/local-pkg@0.4.3/node_modules/local-pkg/dist/shared.mjs
var import_fs = __toESM(require_fs(), 1);
var import_path = __toESM(require_path(), 1);
var import_url = __toESM(require_url(), 1);
var import_process = __toESM(require_process(), 1);
var import_path2 = __toESM(require_path(), 1);
var import_fs2 = __toESM(require_fs(), 1);
var import_url2 = __toESM(require_url(), 1);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField2 = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper2 = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet2(obj, member, value, setter);
  },
  get _() {
    return __privateGet2(obj, member, getter);
  }
});
var Node = class {
  constructor(value) {
    __publicField2(this, "value");
    __publicField2(this, "next");
    this.value = value;
  }
};
var _head;
var _tail;
var _size;
var Queue = class {
  constructor() {
    __privateAdd2(this, _head, void 0);
    __privateAdd2(this, _tail, void 0);
    __privateAdd2(this, _size, void 0);
    this.clear();
  }
  enqueue(value) {
    const node = new Node(value);
    if (__privateGet2(this, _head)) {
      __privateGet2(this, _tail).next = node;
      __privateSet2(this, _tail, node);
    } else {
      __privateSet2(this, _head, node);
      __privateSet2(this, _tail, node);
    }
    __privateWrapper2(this, _size)._++;
  }
  dequeue() {
    const current = __privateGet2(this, _head);
    if (!current) {
      return;
    }
    __privateSet2(this, _head, __privateGet2(this, _head).next);
    __privateWrapper2(this, _size)._--;
    return current.value;
  }
  clear() {
    __privateSet2(this, _head, void 0);
    __privateSet2(this, _tail, void 0);
    __privateSet2(this, _size, 0);
  }
  get size() {
    return __privateGet2(this, _size);
  }
  *[Symbol.iterator]() {
    let current = __privateGet2(this, _head);
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
};
_head = /* @__PURE__ */ new WeakMap();
_tail = /* @__PURE__ */ new WeakMap();
_size = /* @__PURE__ */ new WeakMap();
var findUpStop = Symbol("findUpStop");

// node_modules/.pnpm/local-pkg@0.4.3/node_modules/local-pkg/index.mjs
var _require = (0, import_module.createRequire)(import.meta.url);
function resolveModule(name, options) {
  try {
    return _require.resolve(name, options);
  } catch (e) {
    return void 0;
  }
}
function isPackageExists(name, options) {
  return !!resolvePackage(name, options);
}
function resolvePackage(name, options = {}) {
  try {
    return _require.resolve(`${name}/package.json`, options);
  } catch {
  }
  try {
    return _require.resolve(name, options);
  } catch (e) {
    if (e.code !== "MODULE_NOT_FOUND")
      console.error(e);
    return false;
  }
}

// node_modules/.pnpm/@antfu+install-pkg@0.1.1/node_modules/@antfu/install-pkg/dist/index.mjs
var import_fs4 = __toESM(require_fs(), 1);
var import_path4 = __toESM(require_path(), 1);
var import_find_up = __toESM(require_find_up(), 1);
var import_execa = __toESM(require_execa(), 1);
var AGENTS = ["pnpm", "yarn", "npm", "pnpm@6", "yarn@berry", "bun"];
var LOCKS = {
  "bun.lockb": "bun",
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm",
  "npm-shrinkwrap.json": "npm"
};
async function detectPackageManager(cwd = process.cwd()) {
  let agent = null;
  const lockPath = await (0, import_find_up.default)(Object.keys(LOCKS), { cwd });
  let packageJsonPath;
  if (lockPath)
    packageJsonPath = import_path4.default.resolve(lockPath, "../package.json");
  else
    packageJsonPath = await (0, import_find_up.default)("package.json", { cwd });
  if (packageJsonPath && import_fs4.default.existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(import_fs4.default.readFileSync(packageJsonPath, "utf8"));
      if (typeof pkg.packageManager === "string") {
        const [name, version] = pkg.packageManager.split("@");
        if (name === "yarn" && parseInt(version) > 1)
          agent = "yarn@berry";
        else if (name === "pnpm" && parseInt(version) < 7)
          agent = "pnpm@6";
        else if (name in AGENTS)
          agent = name;
        else
          console.warn("[ni] Unknown packageManager:", pkg.packageManager);
      }
    } catch {
    }
  }
  if (!agent && lockPath)
    agent = LOCKS[import_path4.default.basename(lockPath)];
  return agent;
}
async function installPackage(names, options = {}) {
  const detectedAgent = options.packageManager || await detectPackageManager(options.cwd) || "npm";
  const [agent] = detectedAgent.split("@");
  if (!Array.isArray(names))
    names = [names];
  const args = options.additionalArgs || [];
  if (options.preferOffline) {
    if (detectedAgent === "yarn@berry")
      args.unshift("--cached");
    else
      args.unshift("--prefer-offline");
  }
  return (0, import_execa.default)(
    agent,
    [
      agent === "yarn" ? "add" : "install",
      options.dev ? "-D" : "",
      ...args,
      ...names
    ].filter(Boolean),
    {
      stdio: options.silent ? "ignore" : "inherit",
      cwd: options.cwd
    }
  );
}

// node_modules/.pnpm/@antfu+utils@0.7.5/node_modules/@antfu/utils/dist/index.mjs
function sleep(ms, callback) {
  return new Promise(
    (resolve) => setTimeout(async () => {
      await (callback == null ? void 0 : callback());
      resolve();
    }, ms)
  );
}
var Node2 = class {
  constructor(value) {
    __publicField(this, "value");
    __publicField(this, "next");
    this.value = value;
  }
};
var _head2, _tail2, _size2;
var Queue2 = class {
  constructor() {
    __privateAdd(this, _head2, void 0);
    __privateAdd(this, _tail2, void 0);
    __privateAdd(this, _size2, void 0);
    this.clear();
  }
  enqueue(value) {
    const node = new Node2(value);
    if (__privateGet(this, _head2)) {
      __privateGet(this, _tail2).next = node;
      __privateSet(this, _tail2, node);
    } else {
      __privateSet(this, _head2, node);
      __privateSet(this, _tail2, node);
    }
    __privateWrapper(this, _size2)._++;
  }
  dequeue() {
    const current = __privateGet(this, _head2);
    if (!current) {
      return;
    }
    __privateSet(this, _head2, __privateGet(this, _head2).next);
    __privateWrapper(this, _size2)._--;
    return current.value;
  }
  clear() {
    __privateSet(this, _head2, void 0);
    __privateSet(this, _tail2, void 0);
    __privateSet(this, _size2, 0);
  }
  get size() {
    return __privateGet(this, _size2);
  }
  *[Symbol.iterator]() {
    let current = __privateGet(this, _head2);
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
};
_head2 = new WeakMap();
_tail2 = new WeakMap();
_size2 = new WeakMap();
var VOID = Symbol("p-void");

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/install-pkg.mjs
init_module();

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/warn.mjs
init_module();
var warned = /* @__PURE__ */ new Set();
function warnOnce(msg) {
  if (!warned.has(msg)) {
    warned.add(msg);
    console.warn(yellow(`[@iconify-loader] ${msg}`));
  }
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/install-pkg.mjs
var pending;
var tasks = {};
async function tryInstallPkg(name, autoInstall) {
  if (pending) {
    await pending;
  }
  if (!tasks[name]) {
    console.log(cyan(`Installing ${name}...`));
    if (typeof autoInstall === "function") {
      tasks[name] = pending = autoInstall(name).then(() => sleep(300)).finally(() => {
        pending = void 0;
      });
    } else {
      tasks[name] = pending = installPackage(name, {
        dev: true,
        preferOffline: true
      }).then(() => sleep(300)).catch((e) => {
        warnOnce(`Failed to install ${name}`);
        console.error(e);
      }).finally(() => {
        pending = void 0;
      });
    }
  }
  return tasks[name];
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/fs.mjs
init_module();
var _collections = {};
var isLegacyExists = isPackageExists("@iconify/json");
async function loadCollectionFromFS(name, autoInstall = false) {
  if (!await _collections[name]) {
    _collections[name] = task();
  }
  return _collections[name];
  async function task() {
    let jsonPath = resolveModule(`@iconify-json/${name}/icons.json`);
    if (!jsonPath && isLegacyExists) {
      jsonPath = resolveModule(`@iconify/json/json/${name}.json`);
    }
    if (!jsonPath && !isLegacyExists && autoInstall) {
      await tryInstallPkg(`@iconify-json/${name}`, autoInstall);
      jsonPath = resolveModule(`@iconify-json/${name}/icons.json`);
    }
    let stat;
    try {
      stat = jsonPath ? await import_fs5.promises.lstat(jsonPath) : void 0;
    } catch (err) {
      return void 0;
    }
    if (stat == null ? void 0 : stat.isFile()) {
      return JSON.parse(
        await import_fs5.promises.readFile(jsonPath, "utf8")
      );
    } else {
      return void 0;
    }
  }
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/custom.mjs
var import_debug2 = __toESM(require_browser(), 1);

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/svg/trim.mjs
function trimSVG(str) {
  return str.replace(/(['"])\s*\n\s*([^>\\/\s])/g, "$1 $2").replace(/(["';{}><])\s*\n\s*/g, "$1").replace(/\s*\n\s*/g, " ").replace(/\s+"/g, '"').replace(/="\s+/g, '="').trim();
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/custom.mjs
var debug2 = (0, import_debug2.default)("@iconify-loader:custom");
async function getCustomIcon(custom, collection, icon, options) {
  var _a;
  let result;
  debug2(`${collection}:${icon}`);
  if (typeof custom === "function") {
    result = await custom(icon);
  } else {
    const inline = custom[icon];
    result = typeof inline === "function" ? await inline() : inline;
  }
  if (result) {
    const cleanupIdx = result.indexOf("<svg");
    if (cleanupIdx > 0)
      result = result.slice(cleanupIdx);
    const { transform } = (options == null ? void 0 : options.customizations) ?? {};
    result = typeof transform === "function" ? await transform(result, collection, icon) : result;
    if (!result.startsWith("<svg")) {
      console.warn(
        `Custom icon "${icon}" in "${collection}" is not a valid SVG`
      );
      return result;
    }
    return await mergeIconProps(
      ((_a = options == null ? void 0 : options.customizations) == null ? void 0 : _a.trimCustomSvg) === true ? trimSVG(result) : result,
      collection,
      icon,
      options,
      void 0
    );
  }
}

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/loader.mjs
var import_debug3 = __toESM(require_browser(), 1);
var loadIcon = async (collection, icon, options) => {
  var _a;
  const custom = (_a = options == null ? void 0 : options.customCollections) == null ? void 0 : _a[collection];
  if (custom) {
    if (typeof custom === "function") {
      const result = await custom(icon);
      if (result) {
        if (typeof result === "string") {
          return await getCustomIcon(
            () => result,
            collection,
            icon,
            options
          );
        }
        if ("icons" in result) {
          const ids = [
            icon,
            icon.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
            icon.replace(/([a-z])(\d+)/g, "$1-$2")
          ];
          return await searchForIcon(
            result,
            collection,
            ids,
            options
          );
        }
      }
    } else {
      return await getCustomIcon(custom, collection, icon, options);
    }
  }
  return void 0;
};

// node_modules/.pnpm/@iconify+utils@2.1.7/node_modules/@iconify/utils/lib/loader/node-loader.mjs
var import_debug4 = __toESM(require_browser(), 1);
var import_fs7 = __toESM(require_fs(), 1);
init_module();
var loadNodeIcon = async (collection, icon, options) => {
  let result = await loadIcon(collection, icon, options);
  if (result) {
    return result;
  }
  const iconSet = await loadCollectionFromFS(
    collection,
    options == null ? void 0 : options.autoInstall
  );
  if (iconSet) {
    const ids = [
      icon,
      icon.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
      icon.replace(/([a-z])(\d+)/g, "$1-$2")
    ];
    result = await searchForIcon(iconSet, collection, ids, options);
  }
  if (!result && (options == null ? void 0 : options.warn)) {
    warnOnce(`failed to load ${options.warn} icon`);
  }
  return result;
};
export {
  loadNodeIcon
};
//# sourceMappingURL=node-loader-DWCU55WS.js.map
