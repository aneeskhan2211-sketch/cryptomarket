import { c as createLucideIcon, j as jsxRuntimeExports, v as cn, R as React2, r as reactExports, u as useCoinChart, b as useSettings, g as formatPercent, q as useMarketDataInfinite, L as Link, S as Skeleton, t as formatQuantity } from "./index-CAwuyKvd.js";
import { l as Slot, m as cva, n as createContextScope, u as useComposedRefs, o as createSlot, p as useId, q as Primitive, r as composeEventHandlers, s as useControllableState, t as useCallbackRef, v as Presence, L as Layout, B as Button } from "./Layout-CGMG0XZW.js";
import { u as usePortfolio } from "./usePortfolio-CAwpzsz8.js";
import { u as usePortfolioChart, A as ArrowUpRight } from "./usePortfolioChart-CfulEvlO.js";
import { T as TrendingUp } from "./trending-up-Dr_r4RhI.js";
import { t as TrendingDown, R as ResponsiveContainer, r as AreaChart, s as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, p as Area } from "./AreaChart-DWvYJu2m.js";
import "./index-D4u-7GDa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
];
const ArrowDownRight = createLucideIcon("arrow-down-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = React2.useRef(null);
    const itemMap = React2.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = React2.forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = React2.forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = React2.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      React2.useEffect(() => {
        context.itemMap.set(ref, { ref, ...itemData });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection2(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = React2.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection2,
    createCollectionScope2
  ];
}
var DirectionContext = reactExports.createContext(void 0);
function useDirection(localDir) {
  const globalDir = reactExports.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
const TF_DAYS$1 = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
  "1y": 365
};
function usePortfolioPerformance(txs, coinIds, tf, enabled = true) {
  const days = TF_DAYS$1[tf];
  const MAX = 20;
  const top = reactExports.useMemo(() => coinIds.slice(0, MAX), [coinIds]);
  const id0 = top[0] ?? null;
  const id1 = top[1] ?? null;
  const id2 = top[2] ?? null;
  const id3 = top[3] ?? null;
  const id4 = top[4] ?? null;
  const id5 = top[5] ?? null;
  const id6 = top[6] ?? null;
  const id7 = top[7] ?? null;
  const id8 = top[8] ?? null;
  const id9 = top[9] ?? null;
  const id10 = top[10] ?? null;
  const id11 = top[11] ?? null;
  const id12 = top[12] ?? null;
  const id13 = top[13] ?? null;
  const id14 = top[14] ?? null;
  const id15 = top[15] ?? null;
  const id16 = top[16] ?? null;
  const id17 = top[17] ?? null;
  const id18 = top[18] ?? null;
  const id19 = top[19] ?? null;
  const q0 = useCoinChart(id0, days, "line", enabled && !!id0);
  const q1 = useCoinChart(id1, days, "line", enabled && !!id1);
  const q2 = useCoinChart(id2, days, "line", enabled && !!id2);
  const q3 = useCoinChart(id3, days, "line", enabled && !!id3);
  const q4 = useCoinChart(id4, days, "line", enabled && !!id4);
  const q5 = useCoinChart(id5, days, "line", enabled && !!id5);
  const q6 = useCoinChart(id6, days, "line", enabled && !!id6);
  const q7 = useCoinChart(id7, days, "line", enabled && !!id7);
  const q8 = useCoinChart(id8, days, "line", enabled && !!id8);
  const q9 = useCoinChart(id9, days, "line", enabled && !!id9);
  const q10 = useCoinChart(id10, days, "line", enabled && !!id10);
  const q11 = useCoinChart(id11, days, "line", enabled && !!id11);
  const q12 = useCoinChart(id12, days, "line", enabled && !!id12);
  const q13 = useCoinChart(id13, days, "line", enabled && !!id13);
  const q14 = useCoinChart(id14, days, "line", enabled && !!id14);
  const q15 = useCoinChart(id15, days, "line", enabled && !!id15);
  const q16 = useCoinChart(id16, days, "line", enabled && !!id16);
  const q17 = useCoinChart(id17, days, "line", enabled && !!id17);
  const q18 = useCoinChart(id18, days, "line", enabled && !!id18);
  const q19 = useCoinChart(id19, days, "line", enabled && !!id19);
  const txsByCoin = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const tx of txs) {
      const list = map.get(tx.coinId) ?? [];
      list.push(tx);
      map.set(tx.coinId, list);
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => a.timestamp - b.timestamp);
    }
    return map;
  }, [txs]);
  const data0 = q0.data;
  const data1 = q1.data;
  const data2 = q2.data;
  const data3 = q3.data;
  const data4 = q4.data;
  const data5 = q5.data;
  const data6 = q6.data;
  const data7 = q7.data;
  const data8 = q8.data;
  const data9 = q9.data;
  const data10 = q10.data;
  const data11 = q11.data;
  const data12 = q12.data;
  const data13 = q13.data;
  const data14 = q14.data;
  const data15 = q15.data;
  const data16 = q16.data;
  const data17 = q17.data;
  const data18 = q18.data;
  const data19 = q19.data;
  const merged = reactExports.useMemo(() => {
    var _a;
    if (!enabled) return [];
    const pairs = [
      [top[0] ?? null, data0],
      [top[1] ?? null, data1],
      [top[2] ?? null, data2],
      [top[3] ?? null, data3],
      [top[4] ?? null, data4],
      [top[5] ?? null, data5],
      [top[6] ?? null, data6],
      [top[7] ?? null, data7],
      [top[8] ?? null, data8],
      [top[9] ?? null, data9],
      [top[10] ?? null, data10],
      [top[11] ?? null, data11],
      [top[12] ?? null, data12],
      [top[13] ?? null, data13],
      [top[14] ?? null, data14],
      [top[15] ?? null, data15],
      [top[16] ?? null, data16],
      [top[17] ?? null, data17],
      [top[18] ?? null, data18],
      [top[19] ?? null, data19]
    ];
    const timestamps = /* @__PURE__ */ new Set();
    const validQueries = [];
    for (const [coinId, data] of pairs) {
      if (!coinId) continue;
      if ((data == null ? void 0 : data.line) && data.line.length > 0) {
        validQueries.push({ coinId, line: data.line });
        for (const p of data.line) timestamps.add(p.timestamp);
      }
    }
    if (timestamps.size === 0) return [];
    const sortedTs = Array.from(timestamps).sort((a, b) => a - b);
    const priceCursors = /* @__PURE__ */ new Map();
    for (const { coinId } of validQueries) priceCursors.set(coinId, 0);
    const qtyCursors = /* @__PURE__ */ new Map();
    for (const { coinId } of validQueries) {
      qtyCursors.set(coinId, { idx: 0, qty: 0, cost: 0 });
    }
    const points = [];
    for (const t of sortedTs) {
      let totalValue = 0;
      for (const { coinId, line } of validQueries) {
        let pi = priceCursors.get(coinId) ?? 0;
        while (pi + 1 < line.length && line[pi + 1].timestamp <= t) pi += 1;
        priceCursors.set(coinId, pi);
        const price = ((_a = line[pi]) == null ? void 0 : _a.price) ?? 0;
        const ledger = txsByCoin.get(coinId) ?? [];
        const state = qtyCursors.get(coinId);
        if (!state) continue;
        while (state.idx < ledger.length && ledger[state.idx].timestamp <= t) {
          const tx = ledger[state.idx];
          if (tx.kind === "buy") {
            state.qty += tx.quantity;
            state.cost += tx.quantity * tx.pricePerUnit;
          } else if (tx.kind === "sell") {
            const sellQty = Math.min(tx.quantity, state.qty);
            const avg = state.qty > 0 ? state.cost / state.qty : 0;
            state.qty -= sellQty;
            state.cost -= sellQty * avg;
          } else if (tx.kind === "transfer_in") {
            state.qty += tx.quantity;
            if (tx.pricePerUnit > 0)
              state.cost += tx.quantity * tx.pricePerUnit;
          } else if (tx.kind === "transfer_out") {
            const outQty = Math.min(tx.quantity, state.qty);
            const avg = state.qty > 0 ? state.cost / state.qty : 0;
            state.qty -= outQty;
            state.cost -= outQty * avg;
          }
          state.idx += 1;
        }
        if (state.qty <= 0) continue;
        totalValue += state.qty * price;
      }
      points.push({ timestamp: t, value: totalValue });
    }
    return points;
  }, [
    enabled,
    txsByCoin,
    top,
    data0,
    data1,
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    data8,
    data9,
    data10,
    data11,
    data12,
    data13,
    data14,
    data15,
    data16,
    data17,
    data18,
    data19
  ]);
  const isLoading = q0.isLoading && !!id0 || q1.isLoading && !!id1 || q2.isLoading && !!id2 || q3.isLoading && !!id3 || q4.isLoading && !!id4 || q5.isLoading && !!id5 || q6.isLoading && !!id6 || q7.isLoading && !!id7 || q8.isLoading && !!id8 || q9.isLoading && !!id9 || q10.isLoading && !!id10 || q11.isLoading && !!id11 || q12.isLoading && !!id12 || q13.isLoading && !!id13 || q14.isLoading && !!id14 || q15.isLoading && !!id15 || q16.isLoading && !!id16 || q17.isLoading && !!id17 || q18.isLoading && !!id18 || q19.isLoading && !!id19;
  const anyData = merged.length > 0;
  const isError = !anyData && top.length > 0 && !isLoading;
  return { points: merged, isLoading, isError };
}
const TF_DAYS = { "7d": 7, "30d": 30, "90d": 90 };
const TF_LABELS = {
  "7d": "7 T",
  "30d": "30 T",
  "90d": "90 T"
};
function useCoinPrices() {
  const { data: pages } = useMarketDataInfinite() ?? { data: void 0 };
  return reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    if (pages) {
      for (const page of pages.pages) {
        for (const c of page.coins) {
          m.set(c.id, c.currentPrice);
        }
      }
    }
    return m;
  }, [pages]);
}
function SummaryCard({
  label,
  value,
  sub,
  isPositive,
  isNegative,
  loading,
  privacy
}) {
  const display = privacy ? "••••" : value;
  const subDisplay = privacy ? "••••" : sub;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: label }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-28 rounded" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: `text-xl font-display font-bold ${isPositive ? "text-price-up" : isNegative ? "text-price-down" : "text-foreground"}`,
        children: display
      }
    ),
    subDisplay && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: subDisplay })
  ] }) });
}
function SvgAreaChart({
  data,
  width,
  height
}) {
  if (data.length < 2) return null;
  const padding = { top: 8, right: 8, bottom: 8, left: 8 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;
  const minPrice = Math.min(...data.map((d) => d.price));
  const maxPrice = Math.max(...data.map((d) => d.price));
  const range = maxPrice - minPrice || 1;
  const xScale = (i) => padding.left + i / (data.length - 1) * w;
  const yScale = (price) => padding.top + h - (price - minPrice) / range * h;
  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(d.price)}`).join(" ");
  const areaPath = `${linePath} L ${xScale(data.length - 1)} ${padding.top + h} L ${padding.left} ${padding.top + h} Z`;
  const isUp = data[data.length - 1].price >= data[0].price;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width,
      height,
      className: "overflow-visible",
      role: "img",
      "aria-label": "Portfolio area chart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "areaGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "stop",
            {
              offset: "0%",
              stopColor: isUp ? "oklch(var(--price-up))" : "oklch(var(--price-down))",
              stopOpacity: "0.35"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "stop",
            {
              offset: "100%",
              stopColor: isUp ? "oklch(var(--price-up))" : "oklch(var(--price-down))",
              stopOpacity: "0.02"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: areaPath, fill: "url(#areaGrad)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: linePath,
            fill: "none",
            stroke: isUp ? "oklch(var(--price-up))" : "oklch(var(--price-down))",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
function PortfolioChartSection({
  holdings,
  txs
}) {
  const { t, formatMoney } = useSettings();
  const [tf, setTf] = reactExports.useState("30d");
  const days = TF_DAYS[tf];
  const coinIds = holdings.map((h) => h.coinId);
  const { points, isLoading } = usePortfolioChart({
    txs,
    coinIds,
    days,
    enabled: coinIds.length > 0
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-subtle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: t("reports.portfolioChart") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: tf, onValueChange: (v) => setTf(v), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "h-7 bg-muted", children: ["7d", "30d", "90d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TabsTrigger,
        {
          value: k,
          className: "text-xs px-2 py-0.5",
          "data-ocid": `reports.chart.tab.${k}`,
          children: TF_LABELS[k]
        },
        k
      )) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-lg" }) : points.length < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 flex items-center justify-center text-muted-foreground text-sm", children: t("reports.noTransactions") }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-48 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAreaChart, { data: points, width: 600, height: 192 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatMoney(points[0].price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatMoney(points[points.length - 1].price) })
      ] })
    ] }) })
  ] });
}
function AssetAllocationSection({
  holdings,
  coinPrices
}) {
  const { t, formatMoney } = useSettings();
  const rows = reactExports.useMemo(() => {
    const withValue = holdings.map((h) => {
      const price = coinPrices.get(h.coinId) ?? 0;
      return { ...h, value: h.quantity * price };
    }).filter((h) => h.value > 0).sort((a, b) => b.value - a.value);
    const total = withValue.reduce((s, h) => s + h.value, 0);
    return withValue.map((h) => ({
      ...h,
      pct: total > 0 ? h.value / total * 100 : 0
    }));
  }, [holdings, coinPrices]);
  if (rows.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: t("reports.assetAllocation") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 flex items-center justify-center text-muted-foreground text-sm", children: t("reports.noTransactions") }) })
    ] });
  }
  const colors = [
    "oklch(var(--chart-1))",
    "oklch(var(--chart-2))",
    "oklch(var(--chart-3))",
    "oklch(var(--chart-4))",
    "oklch(var(--chart-5))",
    "oklch(var(--primary))",
    "oklch(var(--accent))"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-subtle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Asset Allocation" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: row.symbol.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          row.pct.toFixed(1),
          "% · ",
          formatMoney(row.value)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full rounded-full transition-all duration-500",
          style: {
            width: `${Math.min(row.pct, 100)}%`,
            backgroundColor: colors[i % colors.length]
          }
        }
      ) })
    ] }, row.coinId)) })
  ] });
}
function TransactionHistorySection({ txs }) {
  const { t, formatMoney } = useSettings();
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    let list = [...txs].sort((a, b) => b.timestamp - a.timestamp);
    if (filter !== "all") list = list.filter((tx) => tx.kind === filter);
    return list;
  }, [txs, filter]);
  const kindBadge = (kind) => {
    const map = {
      buy: {
        label: t("reports.filter.buy"),
        className: "bg-[oklch(var(--trade-buy)/0.15)] text-[oklch(var(--trade-buy))] border-[oklch(var(--trade-buy)/0.3)]"
      },
      sell: {
        label: t("reports.filter.sell"),
        className: "bg-[oklch(var(--trade-sell)/0.15)] text-[oklch(var(--trade-sell))] border-[oklch(var(--trade-sell)/0.3)]"
      },
      transfer_in: {
        label: t("reports.filter.transfer"),
        className: "bg-[oklch(var(--reports-accent)/0.15)] text-[oklch(var(--reports-accent))] border-[oklch(var(--reports-accent)/0.3)]"
      },
      transfer_out: {
        label: t("reports.filter.transfer"),
        className: "bg-[oklch(var(--reports-accent)/0.15)] text-[oklch(var(--reports-accent))] border-[oklch(var(--reports-accent)/0.3)]"
      }
    };
    return map[kind];
  };
  const filters = [
    { key: "all", label: t("reports.filter.all") },
    { key: "buy", label: t("reports.filter.buy") },
    { key: "sell", label: t("reports.filter.sell") },
    { key: "transfer_in", label: t("reports.filter.transfer") }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-subtle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: t("reports.transactionHistory") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: filter === f.key ? "secondary" : "ghost",
          size: "sm",
          className: "h-7 text-xs px-2",
          onClick: () => setFilter(f.key),
          "data-ocid": `reports.filter.${f.key}`,
          children: f.label
        },
        f.key
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 flex items-center justify-center text-muted-foreground text-sm", children: t("reports.noTransactions") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-muted-foreground text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: t("reports.coin") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: t("reports.type") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-3 font-medium", children: t("reports.amount") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-3 font-medium", children: t("reports.price") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-3 font-medium", children: t("reports.total") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 font-medium", children: t("reports.date") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((tx, idx) => {
        const badge = kindBadge(tx.kind);
        const total = tx.quantity * tx.pricePerUnit;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-muted/30 transition-colors",
            "data-ocid": `reports.tx.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-medium text-foreground", children: tx.symbol.toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs ${badge.className}`,
                  children: badge.label
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right text-foreground", children: formatQuantity(tx.quantity) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right text-muted-foreground", children: formatMoney(tx.pricePerUnit) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right font-medium text-foreground", children: formatMoney(total) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right text-muted-foreground text-xs", children: new Date(tx.timestamp).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              }) })
            ]
          },
          tx.id
        );
      }) })
    ] }) }) })
  ] });
}
function PerformanceStatsSection({
  holdings,
  coinPrices
}) {
  const { t, formatMoneyCompact } = useSettings();
  const stats = reactExports.useMemo(() => {
    const withPnL = holdings.map((h) => {
      const price = coinPrices.get(h.coinId) ?? 0;
      const value = h.quantity * price;
      const unrealized = value - h.costBasis;
      const unrealizedPct = h.costBasis > 0 ? unrealized / h.costBasis * 100 : 0;
      return { ...h, value, unrealized, unrealizedPct };
    }).filter((h) => h.value > 0);
    const best = withPnL.length ? withPnL.reduce((a, b) => a.unrealizedPct > b.unrealizedPct ? a : b) : null;
    const worst = withPnL.length ? withPnL.reduce((a, b) => a.unrealizedPct < b.unrealizedPct ? a : b) : null;
    const totalRealized = holdings.reduce((s, h) => s + h.realizedPnL, 0);
    const totalUnrealized = withPnL.reduce((s, h) => s + h.unrealized, 0);
    return { best, worst, totalRealized, totalUnrealized };
  }, [holdings, coinPrices]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-subtle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: t("reports.performanceStats") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-[oklch(var(--trade-buy)/0.15)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-[oklch(var(--trade-buy))]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("reports.bestPerformer") }),
          stats.best ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: stats.best.symbol.toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-price-up", children: [
              "+",
              stats.best.unrealizedPct.toFixed(1),
              "%"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "—" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-[oklch(var(--trade-sell)/0.15)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4 text-[oklch(var(--trade-sell))]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("reports.worstPerformer") }),
          stats.worst ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: stats.worst.symbol.toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-price-down", children: [
              stats.worst.unrealizedPct.toFixed(1),
              "%"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "—" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-[oklch(var(--reports-accent)/0.15)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-[oklch(var(--reports-accent))]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("reports.totalRealized") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `text-sm font-semibold ${stats.totalRealized >= 0 ? "text-price-up" : "text-price-down"}`,
              children: [
                stats.totalRealized >= 0 ? "+" : "",
                formatMoneyCompact(stats.totalRealized)
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-[oklch(var(--reports-accent)/0.15)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "w-4 h-4 text-[oklch(var(--reports-accent))]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("reports.totalUnrealized") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `text-sm font-semibold ${stats.totalUnrealized >= 0 ? "text-price-up" : "text-price-down"}`,
              children: [
                stats.totalUnrealized >= 0 ? "+" : "",
                formatMoneyCompact(stats.totalUnrealized)
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function EmptyState() {
  const { t } = useSettings();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-8 h-8 text-muted-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground mb-1", children: t("reports.empty.title") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center max-w-sm mb-4", children: t("reports.empty.desc") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/portfolio", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "default",
        size: "sm",
        "data-ocid": "reports.empty.cta_button",
        children: t("reports.empty.cta")
      }
    ) })
  ] });
}
function PerformanceTab({ txs }) {
  const { t, formatMoney, settings } = useSettings();
  const [perfTf, setPerfTf] = reactExports.useState("7d");
  const coinIds = reactExports.useMemo(() => [...new Set(txs.map((t2) => t2.coinId))], [txs]);
  const {
    points,
    isLoading: perfLoading,
    isError: perfError
  } = usePortfolioPerformance(txs, coinIds, perfTf, coinIds.length > 0);
  const tfOptions = [
    { key: "24h", label: t("reports.timeframe.24h") },
    { key: "7d", label: t("reports.timeframe.7d") },
    { key: "30d", label: t("reports.timeframe.30d") },
    { key: "1y", label: t("reports.timeframe.1y") }
  ];
  if (txs.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-muted-foreground text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-8 h-8 mb-2" }),
      t("reports.noTransactions")
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: t("reports.performance.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: tfOptions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: perfTf === o.key ? "secondary" : "ghost",
          size: "sm",
          className: "h-7 text-xs px-3 rounded-full",
          onClick: () => setPerfTf(o.key),
          "data-ocid": `reports.perf.tf.${o.key}`,
          children: o.label
        },
        o.key
      )) })
    ] }),
    perfLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded" })
    ] }) : perfError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 flex items-center justify-center text-muted-foreground text-sm", children: "Failed to load chart data" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[300px] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: points, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        XAxis,
        {
          dataKey: "timestamp",
          tickFormatter: (ts) => new Date(ts).toLocaleDateString(settings.language)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tickFormatter: (v) => formatMoney(Number(v)), width: 80 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tooltip,
        {
          labelFormatter: (ts) => new Date(Number(ts)).toLocaleDateString(settings.language),
          formatter: (v) => [formatMoney(v), "Value"]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Area,
        {
          type: "monotone",
          dataKey: "value",
          stroke: "var(--color-primary)",
          fill: "var(--color-primary)",
          fillOpacity: 0.15
        }
      )
    ] }) }) })
  ] });
}
function calculateFifoTax(txs) {
  const byCoin = /* @__PURE__ */ new Map();
  for (const tx of txs) {
    const list = byCoin.get(tx.coinId) ?? [];
    list.push(tx);
    byCoin.set(tx.coinId, list);
  }
  const items = [];
  let totalGain = 0;
  let totalLoss = 0;
  for (const [coinId, list] of byCoin) {
    const sorted = [...list].sort((a, b) => a.timestamp - b.timestamp);
    const buys = sorted.filter(
      (t) => t.kind === "buy" || t.kind === "transfer_in"
    );
    const sells = sorted.filter((t) => t.kind === "sell");
    const buyQueue = [];
    for (const b of buys) {
      buyQueue.push({ qty: b.quantity, price: b.pricePerUnit });
    }
    for (const s of sells) {
      let remaining = s.quantity;
      let costBasis = 0;
      while (remaining > 0 && buyQueue.length > 0) {
        const front = buyQueue[0];
        const use = Math.min(remaining, front.qty);
        costBasis += use * front.price;
        front.qty -= use;
        remaining -= use;
        if (front.qty <= 0) buyQueue.shift();
      }
      const gainLoss = s.quantity * s.pricePerUnit - costBasis;
      if (gainLoss >= 0) totalGain += gainLoss;
      else totalLoss += gainLoss;
      items.push({
        coinId,
        coinName: s.symbol.toUpperCase(),
        date: new Date(s.timestamp).toISOString().split("T")[0],
        sellQty: s.quantity,
        sellPrice: s.pricePerUnit,
        costBasis,
        gainLoss
      });
    }
  }
  items.sort((a, b) => a.date.localeCompare(b.date));
  return { items, totalGain, totalLoss };
}
function TaxReportTab({ txs }) {
  const { t, formatMoney } = useSettings();
  const { items, totalGain, totalLoss } = reactExports.useMemo(
    () => calculateFifoTax(txs),
    [txs]
  );
  const net = totalGain + totalLoss;
  const sellCount = items.length;
  const handleExport = () => {
    const headers = "Date,Coin,SellQty,SellPrice,CostBasis,RealizedGainLoss\n";
    const rows = items.map(
      (it) => `${it.date},${it.coinName},${it.sellQty},${it.sellPrice.toFixed(4)},${it.costBasis.toFixed(4)},${it.gainLoss.toFixed(4)}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    a.href = url;
    a.download = `TaxReport_${today}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  if (sellCount === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-muted-foreground text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-8 h-8 mb-2" }),
      t("tax.noSellTransactions")
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tax-section space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: t("reports.tax.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "h-8 text-xs",
          onClick: handleExport,
          "data-ocid": "tax.export_csv_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1" }),
            t("tax.exportCsv")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: t("tax.totalRealizedGain") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-price-up", children: formatMoney(totalGain) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: t("tax.totalRealizedLoss") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-price-down", children: formatMoney(totalLoss) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: t("tax.netGain") || "Net Gain/Loss" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: `text-xl font-display font-bold ${net >= 0 ? "text-price-up" : "text-price-down"}`,
            children: [
              net >= 0 ? "+" : "",
              formatMoney(net)
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: t("tax.transactionCount") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: sellCount })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: t("tax.details") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-muted-foreground text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: t("reports.date") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 pr-3 font-medium", children: t("reports.coin") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-3 font-medium", children: t("reports.amount") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-3 font-medium", children: t("reports.price") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 pr-3 font-medium", children: "Cost Basis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 font-medium", children: "Gain/Loss" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((it, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-muted/30 transition-colors",
            "data-ocid": `tax.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-foreground", children: it.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-medium text-foreground", children: it.coinName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right text-foreground", children: formatQuantity(it.sellQty) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right text-muted-foreground", children: formatMoney(it.sellPrice) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right text-muted-foreground", children: formatMoney(it.costBasis) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "td",
                {
                  className: `py-2 text-right font-medium ${it.gainLoss >= 0 ? "text-price-up" : "text-price-down"}`,
                  children: [
                    it.gainLoss >= 0 ? "+" : "",
                    formatMoney(it.gainLoss)
                  ]
                }
              )
            ]
          },
          `${it.coinId}-${it.date}-${idx}`
        )) })
      ] }) }) })
    ] })
  ] });
}
function ReportsPage() {
  const { t, formatMoney, formatMoneyCompact } = useSettings();
  const { holdings, txs, isLoading, privacy } = usePortfolio();
  const coinPrices = useCoinPrices();
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const summary = reactExports.useMemo(() => {
    const totalValue = holdings.reduce((s, h) => {
      const price = coinPrices.get(h.coinId) ?? 0;
      return s + h.quantity * price;
    }, 0);
    const totalCost = holdings.reduce((s, h) => s + h.costBasis, 0);
    const totalRealized = holdings.reduce((s, h) => s + h.realizedPnL, 0);
    const totalUnrealized = totalValue - totalCost;
    const totalPnL = totalRealized + totalUnrealized;
    const totalPnLPercent = totalCost > 0 ? totalPnL / totalCost * 100 : 0;
    const change24hPercent = 0;
    return {
      totalValue,
      totalCost,
      totalRealized,
      totalUnrealized,
      totalPnL,
      totalPnLPercent,
      change24hPercent
    };
  }, [holdings, coinPrices]);
  const hasData = holdings.length > 0 || txs.length > 0;
  const tabLabels = {
    overview: t("reports.tab.overview") || "Overview",
    performance: t("reports.tab.performance") || "Performance",
    tax: t("reports.tab.tax") || "Tax Report"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 py-6 max-w-screen-xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: t("reports.title") })
    ] }),
    !hasData && !isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["overview", "performance", "tax"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: activeTab === tab ? "secondary" : "ghost",
          size: "sm",
          className: "h-8 text-xs px-3 rounded-full border",
          onClick: () => setActiveTab(tab),
          "data-ocid": `reports.tab.${tab}`,
          children: tabLabels[tab]
        },
        tab
      )) }),
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryCard,
            {
              label: t("reports.totalValue"),
              value: formatMoney(summary.totalValue),
              loading: isLoading,
              privacy
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryCard,
            {
              label: t("reports.totalInvested"),
              value: formatMoney(summary.totalCost),
              loading: isLoading,
              privacy
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryCard,
            {
              label: t("reports.unrealizedPnL"),
              value: (summary.totalUnrealized >= 0 ? "+" : "") + formatMoneyCompact(summary.totalUnrealized),
              sub: formatPercent(summary.totalPnLPercent),
              isPositive: summary.totalUnrealized > 0,
              isNegative: summary.totalUnrealized < 0,
              loading: isLoading,
              privacy
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryCard,
            {
              label: t("reports.realizedPnL"),
              value: (summary.totalRealized >= 0 ? "+" : "") + formatMoneyCompact(summary.totalRealized),
              isPositive: summary.totalRealized > 0,
              isNegative: summary.totalRealized < 0,
              loading: isLoading,
              privacy
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryCard,
            {
              label: t("reports.change24h"),
              value: formatPercent(summary.change24hPercent),
              loading: isLoading,
              privacy
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PortfolioChartSection, { holdings, txs }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AssetAllocationSection,
          {
            holdings,
            coinPrices
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionHistorySection, { txs }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PerformanceStatsSection,
          {
            holdings,
            coinPrices
          }
        ) })
      ] }),
      activeTab === "performance" && /* @__PURE__ */ jsxRuntimeExports.jsx(PerformanceTab, { txs }),
      activeTab === "tax" && /* @__PURE__ */ jsxRuntimeExports.jsx(TaxReportTab, { txs })
    ] })
  ] }) });
}
export {
  ReportsPage as default
};
