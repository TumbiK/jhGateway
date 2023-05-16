declare const VERSION: string;
declare const SERVER_API_URL: string;
declare const DEVELOPMENT: string;
declare const I18N_HASH: string;

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '@gateway/entities-routes' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@gateway/entities-menu' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@approval/entities-routes' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@approval/entities-menu' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@notifiction/entities-routes' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@notifiction/entities-menu' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@performance/entities-routes' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@performance/entities-menu' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@finances/entities-routes' {
  const _default: () => JSX.Element;
  export default _default;
}

declare module '@finances/entities-menu' {
  const _default: () => JSX.Element;
  export default _default;
}
