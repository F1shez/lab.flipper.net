import { a as getDefaultExportFromCjs } from "./_commonjsHelpers-DHRe3nu-.js";
var re = { exports: {} };
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const SEMVER_SPEC_VERSION = "2.0.0";
  const MAX_LENGTH = 256;
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991;
  const MAX_SAFE_COMPONENT_LENGTH = 16;
  const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
  const RELEASE_TYPES = [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease"
  ];
  constants = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  };
  return constants;
}
var debug_1;
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug_1;
  hasRequiredDebug = 1;
  var define_process_env_default = {};
  const debug = typeof process === "object" && define_process_env_default && define_process_env_default.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  debug_1 = debug;
  return debug_1;
}
var hasRequiredRe;
function requireRe() {
  if (hasRequiredRe) return re.exports;
  hasRequiredRe = 1;
  (function(module, exports) {
    const {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = requireConstants();
    const debug = requireDebug();
    exports = module.exports = {};
    const re2 = exports.re = [];
    const safeRe = exports.safeRe = [];
    const src = exports.src = [];
    const safeSrc = exports.safeSrc = [];
    const t = exports.t = {};
    let R = 0;
    const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    const safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    const makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    const createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(re, re.exports);
  return re.exports;
}
var parseOptions_1;
var hasRequiredParseOptions;
function requireParseOptions() {
  if (hasRequiredParseOptions) return parseOptions_1;
  hasRequiredParseOptions = 1;
  const looseOption = Object.freeze({ loose: true });
  const emptyOpts = Object.freeze({});
  const parseOptions = (options) => {
    if (!options) {
      return emptyOpts;
    }
    if (typeof options !== "object") {
      return looseOption;
    }
    return options;
  };
  parseOptions_1 = parseOptions;
  return parseOptions_1;
}
var identifiers;
var hasRequiredIdentifiers;
function requireIdentifiers() {
  if (hasRequiredIdentifiers) return identifiers;
  hasRequiredIdentifiers = 1;
  const numeric = /^[0-9]+$/;
  const compareIdentifiers = (a, b) => {
    const anum = numeric.test(a);
    const bnum = numeric.test(b);
    if (anum && bnum) {
      a = +a;
      b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  };
  const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
  identifiers = {
    compareIdentifiers,
    rcompareIdentifiers
  };
  return identifiers;
}
var semver$2;
var hasRequiredSemver$1;
function requireSemver$1() {
  if (hasRequiredSemver$1) return semver$2;
  hasRequiredSemver$1 = 1;
  const debug = requireDebug();
  const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
  const { safeRe: re2, t } = requireRe();
  const parseOptions = requireParseOptions();
  const { compareIdentifiers } = requireIdentifiers();
  class SemVer {
    constructor(version, options) {
      options = parseOptions(options);
      if (version instanceof SemVer) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(
          `version is longer than ${MAX_LENGTH} characters`
        );
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      const m = version.trim().match(options.loose ? re2[t.LOOSE] : re2[t.FULL]);
      if (!m) {
        throw new TypeError(`Invalid Version: ${version}`);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map((id) => {
          if (/^[0-9]+$/.test(id)) {
            const num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join(".")}`;
      }
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        if (typeof other === "string" && other === this.version) {
          return 0;
        }
        other = new SemVer(other, this.options);
      }
      if (other.version === this.version) {
        return 0;
      }
      return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      let i = 0;
      do {
        const a = this.prerelease[i];
        const b = other.prerelease[i];
        debug("prerelease compare", i, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    compareBuild(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      let i = 0;
      do {
        const a = this.build[i];
        const b = other.build[i];
        debug("build compare", i, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
      if (release.startsWith("pre")) {
        if (!identifier && identifierBase === false) {
          throw new Error("invalid increment argument: identifier is empty");
        }
        if (identifier) {
          const match = `-${identifier}`.match(this.options.loose ? re2[t.PRERELEASELOOSE] : re2[t.PRERELEASE]);
          if (!match || match[1] !== identifier) {
            throw new Error(`invalid identifier: ${identifier}`);
          }
        }
      }
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier, identifierBase);
          this.inc("pre", identifier, identifierBase);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier, identifierBase);
          }
          this.inc("pre", identifier, identifierBase);
          break;
        case "release":
          if (this.prerelease.length === 0) {
            throw new Error(`version ${this.raw} is not a prerelease`);
          }
          this.prerelease.length = 0;
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const base = Number(identifierBase) ? 1 : 0;
          if (this.prerelease.length === 0) {
            this.prerelease = [base];
          } else {
            let i = this.prerelease.length;
            while (--i >= 0) {
              if (typeof this.prerelease[i] === "number") {
                this.prerelease[i]++;
                i = -2;
              }
            }
            if (i === -1) {
              if (identifier === this.prerelease.join(".") && identifierBase === false) {
                throw new Error("invalid increment argument: identifier already exists");
              }
              this.prerelease.push(base);
            }
          }
          if (identifier) {
            let prerelease = [identifier, base];
            if (identifierBase === false) {
              prerelease = [identifier];
            }
            if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = prerelease;
              }
            } else {
              this.prerelease = prerelease;
            }
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      this.raw = this.format();
      if (this.build.length) {
        this.raw += `+${this.build.join(".")}`;
      }
      return this;
    }
  }
  semver$2 = SemVer;
  return semver$2;
}
var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const SemVer = requireSemver$1();
  const parse = (version, options, throwErrors = false) => {
    if (version instanceof SemVer) {
      return version;
    }
    try {
      return new SemVer(version, options);
    } catch (er) {
      if (!throwErrors) {
        return null;
      }
      throw er;
    }
  };
  parse_1 = parse;
  return parse_1;
}
var valid_1;
var hasRequiredValid$1;
function requireValid$1() {
  if (hasRequiredValid$1) return valid_1;
  hasRequiredValid$1 = 1;
  const parse = requireParse();
  const valid2 = (version, options) => {
    const v = parse(version, options);
    return v ? v.version : null;
  };
  valid_1 = valid2;
  return valid_1;
}
var clean_1;
var hasRequiredClean;
function requireClean() {
  if (hasRequiredClean) return clean_1;
  hasRequiredClean = 1;
  const parse = requireParse();
  const clean = (version, options) => {
    const s = parse(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  };
  clean_1 = clean;
  return clean_1;
}
var inc_1;
var hasRequiredInc;
function requireInc() {
  if (hasRequiredInc) return inc_1;
  hasRequiredInc = 1;
  const SemVer = requireSemver$1();
  const inc = (version, release, options, identifier, identifierBase) => {
    if (typeof options === "string") {
      identifierBase = identifier;
      identifier = options;
      options = void 0;
    }
    try {
      return new SemVer(
        version instanceof SemVer ? version.version : version,
        options
      ).inc(release, identifier, identifierBase).version;
    } catch (er) {
      return null;
    }
  };
  inc_1 = inc;
  return inc_1;
}
var diff_1;
var hasRequiredDiff;
function requireDiff() {
  if (hasRequiredDiff) return diff_1;
  hasRequiredDiff = 1;
  const parse = requireParse();
  const diff = (version1, version2) => {
    const v1 = parse(version1, null, true);
    const v2 = parse(version2, null, true);
    const comparison = v1.compare(v2);
    if (comparison === 0) {
      return null;
    }
    const v1Higher = comparison > 0;
    const highVersion = v1Higher ? v1 : v2;
    const lowVersion = v1Higher ? v2 : v1;
    const highHasPre = !!highVersion.prerelease.length;
    const lowHasPre = !!lowVersion.prerelease.length;
    if (lowHasPre && !highHasPre) {
      if (!lowVersion.patch && !lowVersion.minor) {
        return "major";
      }
      if (lowVersion.compareMain(highVersion) === 0) {
        if (lowVersion.minor && !lowVersion.patch) {
          return "minor";
        }
        return "patch";
      }
    }
    const prefix = highHasPre ? "pre" : "";
    if (v1.major !== v2.major) {
      return prefix + "major";
    }
    if (v1.minor !== v2.minor) {
      return prefix + "minor";
    }
    if (v1.patch !== v2.patch) {
      return prefix + "patch";
    }
    return "prerelease";
  };
  diff_1 = diff;
  return diff_1;
}
var major_1;
var hasRequiredMajor;
function requireMajor() {
  if (hasRequiredMajor) return major_1;
  hasRequiredMajor = 1;
  const SemVer = requireSemver$1();
  const major = (a, loose) => new SemVer(a, loose).major;
  major_1 = major;
  return major_1;
}
var minor_1;
var hasRequiredMinor;
function requireMinor() {
  if (hasRequiredMinor) return minor_1;
  hasRequiredMinor = 1;
  const SemVer = requireSemver$1();
  const minor = (a, loose) => new SemVer(a, loose).minor;
  minor_1 = minor;
  return minor_1;
}
var patch_1;
var hasRequiredPatch;
function requirePatch() {
  if (hasRequiredPatch) return patch_1;
  hasRequiredPatch = 1;
  const SemVer = requireSemver$1();
  const patch = (a, loose) => new SemVer(a, loose).patch;
  patch_1 = patch;
  return patch_1;
}
var prerelease_1;
var hasRequiredPrerelease;
function requirePrerelease() {
  if (hasRequiredPrerelease) return prerelease_1;
  hasRequiredPrerelease = 1;
  const parse = requireParse();
  const prerelease = (version, options) => {
    const parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  };
  prerelease_1 = prerelease;
  return prerelease_1;
}
var compare_1;
var hasRequiredCompare;
function requireCompare() {
  if (hasRequiredCompare) return compare_1;
  hasRequiredCompare = 1;
  const SemVer = requireSemver$1();
  const compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
  compare_1 = compare;
  return compare_1;
}
var rcompare_1;
var hasRequiredRcompare;
function requireRcompare() {
  if (hasRequiredRcompare) return rcompare_1;
  hasRequiredRcompare = 1;
  const compare = requireCompare();
  const rcompare = (a, b, loose) => compare(b, a, loose);
  rcompare_1 = rcompare;
  return rcompare_1;
}
var compareLoose_1;
var hasRequiredCompareLoose;
function requireCompareLoose() {
  if (hasRequiredCompareLoose) return compareLoose_1;
  hasRequiredCompareLoose = 1;
  const compare = requireCompare();
  const compareLoose = (a, b) => compare(a, b, true);
  compareLoose_1 = compareLoose;
  return compareLoose_1;
}
var compareBuild_1;
var hasRequiredCompareBuild;
function requireCompareBuild() {
  if (hasRequiredCompareBuild) return compareBuild_1;
  hasRequiredCompareBuild = 1;
  const SemVer = requireSemver$1();
  const compareBuild = (a, b, loose) => {
    const versionA = new SemVer(a, loose);
    const versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
  };
  compareBuild_1 = compareBuild;
  return compareBuild_1;
}
var sort_1;
var hasRequiredSort;
function requireSort() {
  if (hasRequiredSort) return sort_1;
  hasRequiredSort = 1;
  const compareBuild = requireCompareBuild();
  const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
  sort_1 = sort;
  return sort_1;
}
var rsort_1;
var hasRequiredRsort;
function requireRsort() {
  if (hasRequiredRsort) return rsort_1;
  hasRequiredRsort = 1;
  const compareBuild = requireCompareBuild();
  const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
  rsort_1 = rsort;
  return rsort_1;
}
var gt_1;
var hasRequiredGt;
function requireGt() {
  if (hasRequiredGt) return gt_1;
  hasRequiredGt = 1;
  const compare = requireCompare();
  const gt = (a, b, loose) => compare(a, b, loose) > 0;
  gt_1 = gt;
  return gt_1;
}
var lt_1;
var hasRequiredLt;
function requireLt() {
  if (hasRequiredLt) return lt_1;
  hasRequiredLt = 1;
  const compare = requireCompare();
  const lt = (a, b, loose) => compare(a, b, loose) < 0;
  lt_1 = lt;
  return lt_1;
}
var eq_1;
var hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  const compare = requireCompare();
  const eq = (a, b, loose) => compare(a, b, loose) === 0;
  eq_1 = eq;
  return eq_1;
}
var neq_1;
var hasRequiredNeq;
function requireNeq() {
  if (hasRequiredNeq) return neq_1;
  hasRequiredNeq = 1;
  const compare = requireCompare();
  const neq = (a, b, loose) => compare(a, b, loose) !== 0;
  neq_1 = neq;
  return neq_1;
}
var gte_1;
var hasRequiredGte;
function requireGte() {
  if (hasRequiredGte) return gte_1;
  hasRequiredGte = 1;
  const compare = requireCompare();
  const gte = (a, b, loose) => compare(a, b, loose) >= 0;
  gte_1 = gte;
  return gte_1;
}
var lte_1;
var hasRequiredLte;
function requireLte() {
  if (hasRequiredLte) return lte_1;
  hasRequiredLte = 1;
  const compare = requireCompare();
  const lte = (a, b, loose) => compare(a, b, loose) <= 0;
  lte_1 = lte;
  return lte_1;
}
var cmp_1;
var hasRequiredCmp;
function requireCmp() {
  if (hasRequiredCmp) return cmp_1;
  hasRequiredCmp = 1;
  const eq = requireEq();
  const neq = requireNeq();
  const gt = requireGt();
  const gte = requireGte();
  const lt = requireLt();
  const lte = requireLte();
  const cmp = (a, op, b, loose) => {
    switch (op) {
      case "===":
        if (typeof a === "object") {
          a = a.version;
        }
        if (typeof b === "object") {
          b = b.version;
        }
        return a === b;
      case "!==":
        if (typeof a === "object") {
          a = a.version;
        }
        if (typeof b === "object") {
          b = b.version;
        }
        return a !== b;
      case "":
      case "=":
      case "==":
        return eq(a, b, loose);
      case "!=":
        return neq(a, b, loose);
      case ">":
        return gt(a, b, loose);
      case ">=":
        return gte(a, b, loose);
      case "<":
        return lt(a, b, loose);
      case "<=":
        return lte(a, b, loose);
      default:
        throw new TypeError(`Invalid operator: ${op}`);
    }
  };
  cmp_1 = cmp;
  return cmp_1;
}
var coerce_1;
var hasRequiredCoerce;
function requireCoerce() {
  if (hasRequiredCoerce) return coerce_1;
  hasRequiredCoerce = 1;
  const SemVer = requireSemver$1();
  const parse = requireParse();
  const { safeRe: re2, t } = requireRe();
  const coerce = (version, options) => {
    if (version instanceof SemVer) {
      return version;
    }
    if (typeof version === "number") {
      version = String(version);
    }
    if (typeof version !== "string") {
      return null;
    }
    options = options || {};
    let match = null;
    if (!options.rtl) {
      match = version.match(options.includePrerelease ? re2[t.COERCEFULL] : re2[t.COERCE]);
    } else {
      const coerceRtlRegex = options.includePrerelease ? re2[t.COERCERTLFULL] : re2[t.COERCERTL];
      let next;
      while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
        if (!match || next.index + next[0].length !== match.index + match[0].length) {
          match = next;
        }
        coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
      }
      coerceRtlRegex.lastIndex = -1;
    }
    if (match === null) {
      return null;
    }
    const major = match[2];
    const minor = match[3] || "0";
    const patch = match[4] || "0";
    const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
    const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
    return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
  };
  coerce_1 = coerce;
  return coerce_1;
}
var lrucache;
var hasRequiredLrucache;
function requireLrucache() {
  if (hasRequiredLrucache) return lrucache;
  hasRequiredLrucache = 1;
  class LRUCache {
    constructor() {
      this.max = 1e3;
      this.map = /* @__PURE__ */ new Map();
    }
    get(key) {
      const value = this.map.get(key);
      if (value === void 0) {
        return void 0;
      } else {
        this.map.delete(key);
        this.map.set(key, value);
        return value;
      }
    }
    delete(key) {
      return this.map.delete(key);
    }
    set(key, value) {
      const deleted = this.delete(key);
      if (!deleted && value !== void 0) {
        if (this.map.size >= this.max) {
          const firstKey = this.map.keys().next().value;
          this.delete(firstKey);
        }
        this.map.set(key, value);
      }
      return this;
    }
  }
  lrucache = LRUCache;
  return lrucache;
}
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  const SPACE_CHARACTERS = /\s+/g;
  class Range {
    constructor(range2, options) {
      options = parseOptions(options);
      if (range2 instanceof Range) {
        if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
          return range2;
        } else {
          return new Range(range2.raw, options);
        }
      }
      if (range2 instanceof Comparator) {
        this.raw = range2.value;
        this.set = [[range2]];
        this.formatted = void 0;
        return this;
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range2.trim().replace(SPACE_CHARACTERS, " ");
      this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      }
      if (this.set.length > 1) {
        const first = this.set[0];
        this.set = this.set.filter((c) => !isNullSet(c[0]));
        if (this.set.length === 0) {
          this.set = [first];
        } else if (this.set.length > 1) {
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let i = 0; i < this.set.length; i++) {
          if (i > 0) {
            this.formatted += "||";
          }
          const comps = this.set[i];
          for (let k = 0; k < comps.length; k++) {
            if (k > 0) {
              this.formatted += " ";
            }
            this.formatted += comps[k].toString().trim();
          }
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range2) {
      const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
      const memoKey = memoOpts + ":" + range2;
      const cached = cache.get(memoKey);
      if (cached) {
        return cached;
      }
      const loose = this.options.loose;
      const hr = loose ? re2[t.HYPHENRANGELOOSE] : re2[t.HYPHENRANGE];
      range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug("hyphen replace", range2);
      range2 = range2.replace(re2[t.COMPARATORTRIM], comparatorTrimReplace);
      debug("comparator trim", range2);
      range2 = range2.replace(re2[t.TILDETRIM], tildeTrimReplace);
      debug("tilde trim", range2);
      range2 = range2.replace(re2[t.CARETTRIM], caretTrimReplace);
      debug("caret trim", range2);
      let rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
      if (loose) {
        rangeList = rangeList.filter((comp) => {
          debug("loose invalid filter", comp, this.options);
          return !!comp.match(re2[t.COMPARATORLOOSE]);
        });
      }
      debug("range list", rangeList);
      const rangeMap = /* @__PURE__ */ new Map();
      const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp];
        }
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has("")) {
        rangeMap.delete("");
      }
      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result;
    }
    intersects(range2, options) {
      if (!(range2 instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some((thisComparators) => {
        return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
          return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
            return rangeComparators.every((rangeComparator) => {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true;
        }
      }
      return false;
    }
  }
  range = Range;
  const LRU = requireLrucache();
  const cache = new LRU();
  const parseOptions = requireParseOptions();
  const Comparator = requireComparator();
  const debug = requireDebug();
  const SemVer = requireSemver$1();
  const {
    safeRe: re2,
    t,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = requireRe();
  const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = requireConstants();
  const isNullSet = (c) => c.value === "<0.0.0-0";
  const isAny = (c) => c.value === "";
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  };
  const parseComparator = (comp, options) => {
    debug("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug("caret", comp);
    comp = replaceTildes(comp, options);
    debug("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug("xrange", comp);
    comp = replaceStars(comp, options);
    debug("stars", comp);
    return comp;
  };
  const isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
  const replaceTildes = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
  };
  const replaceTilde = (comp, options) => {
    const r = options.loose ? re2[t.TILDELOOSE] : re2[t.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug("tilde", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
      } else if (pr) {
        debug("replaceTilde pr", pr);
        ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
      } else {
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
      }
      debug("tilde return", ret);
      return ret;
    });
  };
  const replaceCarets = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
  };
  const replaceCaret = (comp, options) => {
    debug("caret", comp, options);
    const r = options.loose ? re2[t.CARETLOOSE] : re2[t.CARET];
    const z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr) => {
      debug("caret", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        if (M === "0") {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        }
      } else if (pr) {
        debug("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        }
      } else {
        debug("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
      }
      debug("caret return", ret);
      return ret;
    });
  };
  const replaceXRanges = (comp, options) => {
    debug("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
  };
  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r = options.loose ? re2[t.XRANGELOOSE] : re2[t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug("xRange", comp, ret, gtlt, M, m, p, pr);
      const xM = isX(M);
      const xm = xM || isX(m);
      const xp = xm || isX(p);
      const anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      pr = options.includePrerelease ? "-0" : "";
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        if (gtlt === "<") {
          pr = "-0";
        }
        ret = `${gtlt + M}.${m}.${p}${pr}`;
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
      }
      debug("xRange return", ret);
      return ret;
    });
  };
  const replaceStars = (comp, options) => {
    debug("replaceStars", comp, options);
    return comp.trim().replace(re2[t.STAR], "");
  };
  const replaceGTE0 = (comp, options) => {
    debug("replaceGTE0", comp, options);
    return comp.trim().replace(re2[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
  };
  const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? "-0" : ""}`;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }
    return `${from} ${to}`.trim();
  };
  const testSet = (set, version, options) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version)) {
        return false;
      }
    }
    if (version.prerelease.length && !options.includePrerelease) {
      for (let i = 0; i < set.length; i++) {
        debug(set[i].semver);
        if (set[i].semver === Comparator.ANY) {
          continue;
        }
        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  };
  return range;
}
var comparator;
var hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator) return comparator;
  hasRequiredComparator = 1;
  const ANY = Symbol("SemVer ANY");
  class Comparator {
    static get ANY() {
      return ANY;
    }
    constructor(comp, options) {
      options = parseOptions(options);
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug("comp", this);
    }
    parse(comp) {
      const r = this.options.loose ? re2[t.COMPARATORLOOSE] : re2[t.COMPARATOR];
      const m = comp.match(r);
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`);
      }
      this.operator = m[1] !== void 0 ? m[1] : "";
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    }
    toString() {
      return this.value;
    }
    test(version) {
      debug("Comparator.test", version, this.options.loose);
      if (this.semver === ANY || version === ANY) {
        return true;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (this.operator === "") {
        if (this.value === "") {
          return true;
        }
        return new Range(comp.value, options).test(this.value);
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true;
        }
        return new Range(this.value, options).test(comp.semver);
      }
      options = parseOptions(options);
      if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
        return false;
      }
      if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
        return false;
      }
      if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
        return true;
      }
      if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
        return true;
      }
      if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
        return true;
      }
      if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
        return true;
      }
      if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
        return true;
      }
      return false;
    }
  }
  comparator = Comparator;
  const parseOptions = requireParseOptions();
  const { safeRe: re2, t } = requireRe();
  const cmp = requireCmp();
  const debug = requireDebug();
  const SemVer = requireSemver$1();
  const Range = requireRange();
  return comparator;
}
var satisfies_1;
var hasRequiredSatisfies;
function requireSatisfies() {
  if (hasRequiredSatisfies) return satisfies_1;
  hasRequiredSatisfies = 1;
  const Range = requireRange();
  const satisfies = (version, range2, options) => {
    try {
      range2 = new Range(range2, options);
    } catch (er) {
      return false;
    }
    return range2.test(version);
  };
  satisfies_1 = satisfies;
  return satisfies_1;
}
var toComparators_1;
var hasRequiredToComparators;
function requireToComparators() {
  if (hasRequiredToComparators) return toComparators_1;
  hasRequiredToComparators = 1;
  const Range = requireRange();
  const toComparators = (range2, options) => new Range(range2, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
  toComparators_1 = toComparators;
  return toComparators_1;
}
var maxSatisfying_1;
var hasRequiredMaxSatisfying;
function requireMaxSatisfying() {
  if (hasRequiredMaxSatisfying) return maxSatisfying_1;
  hasRequiredMaxSatisfying = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const maxSatisfying = (versions, range2, options) => {
    let max = null;
    let maxSV = null;
    let rangeObj = null;
    try {
      rangeObj = new Range(range2, options);
    } catch (er) {
      return null;
    }
    versions.forEach((v) => {
      if (rangeObj.test(v)) {
        if (!max || maxSV.compare(v) === -1) {
          max = v;
          maxSV = new SemVer(max, options);
        }
      }
    });
    return max;
  };
  maxSatisfying_1 = maxSatisfying;
  return maxSatisfying_1;
}
var minSatisfying_1;
var hasRequiredMinSatisfying;
function requireMinSatisfying() {
  if (hasRequiredMinSatisfying) return minSatisfying_1;
  hasRequiredMinSatisfying = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const minSatisfying = (versions, range2, options) => {
    let min = null;
    let minSV = null;
    let rangeObj = null;
    try {
      rangeObj = new Range(range2, options);
    } catch (er) {
      return null;
    }
    versions.forEach((v) => {
      if (rangeObj.test(v)) {
        if (!min || minSV.compare(v) === 1) {
          min = v;
          minSV = new SemVer(min, options);
        }
      }
    });
    return min;
  };
  minSatisfying_1 = minSatisfying;
  return minSatisfying_1;
}
var minVersion_1;
var hasRequiredMinVersion;
function requireMinVersion() {
  if (hasRequiredMinVersion) return minVersion_1;
  hasRequiredMinVersion = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const gt = requireGt();
  const minVersion = (range2, loose) => {
    range2 = new Range(range2, loose);
    let minver = new SemVer("0.0.0");
    if (range2.test(minver)) {
      return minver;
    }
    minver = new SemVer("0.0.0-0");
    if (range2.test(minver)) {
      return minver;
    }
    minver = null;
    for (let i = 0; i < range2.set.length; ++i) {
      const comparators = range2.set[i];
      let setMin = null;
      comparators.forEach((comparator2) => {
        const compver = new SemVer(comparator2.semver.version);
        switch (comparator2.operator) {
          case ">":
            if (compver.prerelease.length === 0) {
              compver.patch++;
            } else {
              compver.prerelease.push(0);
            }
            compver.raw = compver.format();
          /* fallthrough */
          case "":
          case ">=":
            if (!setMin || gt(compver, setMin)) {
              setMin = compver;
            }
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${comparator2.operator}`);
        }
      });
      if (setMin && (!minver || gt(minver, setMin))) {
        minver = setMin;
      }
    }
    if (minver && range2.test(minver)) {
      return minver;
    }
    return null;
  };
  minVersion_1 = minVersion;
  return minVersion_1;
}
var valid;
var hasRequiredValid;
function requireValid() {
  if (hasRequiredValid) return valid;
  hasRequiredValid = 1;
  const Range = requireRange();
  const validRange = (range2, options) => {
    try {
      return new Range(range2, options).range || "*";
    } catch (er) {
      return null;
    }
  };
  valid = validRange;
  return valid;
}
var outside_1;
var hasRequiredOutside;
function requireOutside() {
  if (hasRequiredOutside) return outside_1;
  hasRequiredOutside = 1;
  const SemVer = requireSemver$1();
  const Comparator = requireComparator();
  const { ANY } = Comparator;
  const Range = requireRange();
  const satisfies = requireSatisfies();
  const gt = requireGt();
  const lt = requireLt();
  const lte = requireLte();
  const gte = requireGte();
  const outside = (version, range2, hilo, options) => {
    version = new SemVer(version, options);
    range2 = new Range(range2, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case ">":
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = ">";
        ecomp = ">=";
        break;
      case "<":
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = "<";
        ecomp = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version, range2, options)) {
      return false;
    }
    for (let i = 0; i < range2.set.length; ++i) {
      const comparators = range2.set[i];
      let high = null;
      let low = null;
      comparators.forEach((comparator2) => {
        if (comparator2.semver === ANY) {
          comparator2 = new Comparator(">=0.0.0");
        }
        high = high || comparator2;
        low = low || comparator2;
        if (gtfn(comparator2.semver, high.semver, options)) {
          high = comparator2;
        } else if (ltfn(comparator2.semver, low.semver, options)) {
          low = comparator2;
        }
      });
      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }
      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false;
      }
    }
    return true;
  };
  outside_1 = outside;
  return outside_1;
}
var gtr_1;
var hasRequiredGtr;
function requireGtr() {
  if (hasRequiredGtr) return gtr_1;
  hasRequiredGtr = 1;
  const outside = requireOutside();
  const gtr = (version, range2, options) => outside(version, range2, ">", options);
  gtr_1 = gtr;
  return gtr_1;
}
var ltr_1;
var hasRequiredLtr;
function requireLtr() {
  if (hasRequiredLtr) return ltr_1;
  hasRequiredLtr = 1;
  const outside = requireOutside();
  const ltr = (version, range2, options) => outside(version, range2, "<", options);
  ltr_1 = ltr;
  return ltr_1;
}
var intersects_1;
var hasRequiredIntersects;
function requireIntersects() {
  if (hasRequiredIntersects) return intersects_1;
  hasRequiredIntersects = 1;
  const Range = requireRange();
  const intersects = (r1, r2, options) => {
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2, options);
  };
  intersects_1 = intersects;
  return intersects_1;
}
var simplify;
var hasRequiredSimplify;
function requireSimplify() {
  if (hasRequiredSimplify) return simplify;
  hasRequiredSimplify = 1;
  const satisfies = requireSatisfies();
  const compare = requireCompare();
  simplify = (versions, range2, options) => {
    const set = [];
    let first = null;
    let prev = null;
    const v = versions.sort((a, b) => compare(a, b, options));
    for (const version of v) {
      const included = satisfies(version, range2, options);
      if (included) {
        prev = version;
        if (!first) {
          first = version;
        }
      } else {
        if (prev) {
          set.push([first, prev]);
        }
        prev = null;
        first = null;
      }
    }
    if (first) {
      set.push([first, null]);
    }
    const ranges = [];
    for (const [min, max] of set) {
      if (min === max) {
        ranges.push(min);
      } else if (!max && min === v[0]) {
        ranges.push("*");
      } else if (!max) {
        ranges.push(`>=${min}`);
      } else if (min === v[0]) {
        ranges.push(`<=${max}`);
      } else {
        ranges.push(`${min} - ${max}`);
      }
    }
    const simplified = ranges.join(" || ");
    const original = typeof range2.raw === "string" ? range2.raw : String(range2);
    return simplified.length < original.length ? simplified : range2;
  };
  return simplify;
}
var subset_1;
var hasRequiredSubset;
function requireSubset() {
  if (hasRequiredSubset) return subset_1;
  hasRequiredSubset = 1;
  const Range = requireRange();
  const Comparator = requireComparator();
  const { ANY } = Comparator;
  const satisfies = requireSatisfies();
  const compare = requireCompare();
  const subset = (sub, dom, options = {}) => {
    if (sub === dom) {
      return true;
    }
    sub = new Range(sub, options);
    dom = new Range(dom, options);
    let sawNonNull = false;
    OUTER: for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub) {
          continue OUTER;
        }
      }
      if (sawNonNull) {
        return false;
      }
    }
    return true;
  };
  const minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
  const minimumVersion = [new Comparator(">=0.0.0")];
  const simpleSubset = (sub, dom, options) => {
    if (sub === dom) {
      return true;
    }
    if (sub.length === 1 && sub[0].semver === ANY) {
      if (dom.length === 1 && dom[0].semver === ANY) {
        return true;
      } else if (options.includePrerelease) {
        sub = minimumVersionWithPreRelease;
      } else {
        sub = minimumVersion;
      }
    }
    if (dom.length === 1 && dom[0].semver === ANY) {
      if (options.includePrerelease) {
        return true;
      } else {
        dom = minimumVersion;
      }
    }
    const eqSet = /* @__PURE__ */ new Set();
    let gt, lt;
    for (const c of sub) {
      if (c.operator === ">" || c.operator === ">=") {
        gt = higherGT(gt, c, options);
      } else if (c.operator === "<" || c.operator === "<=") {
        lt = lowerLT(lt, c, options);
      } else {
        eqSet.add(c.semver);
      }
    }
    if (eqSet.size > 1) {
      return null;
    }
    let gtltComp;
    if (gt && lt) {
      gtltComp = compare(gt.semver, lt.semver, options);
      if (gtltComp > 0) {
        return null;
      } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
        return null;
      }
    }
    for (const eq of eqSet) {
      if (gt && !satisfies(eq, String(gt), options)) {
        return null;
      }
      if (lt && !satisfies(eq, String(lt), options)) {
        return null;
      }
      for (const c of dom) {
        if (!satisfies(eq, String(c), options)) {
          return false;
        }
      }
      return true;
    }
    let higher, lower;
    let hasDomLT, hasDomGT;
    let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
    let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
    if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
      needDomLTPre = false;
    }
    for (const c of dom) {
      hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
      hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
      if (gt) {
        if (needDomGTPre) {
          if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
            needDomGTPre = false;
          }
        }
        if (c.operator === ">" || c.operator === ">=") {
          higher = higherGT(gt, c, options);
          if (higher === c && higher !== gt) {
            return false;
          }
        } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
          return false;
        }
      }
      if (lt) {
        if (needDomLTPre) {
          if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
            needDomLTPre = false;
          }
        }
        if (c.operator === "<" || c.operator === "<=") {
          lower = lowerLT(lt, c, options);
          if (lower === c && lower !== lt) {
            return false;
          }
        } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
          return false;
        }
      }
      if (!c.operator && (lt || gt) && gtltComp !== 0) {
        return false;
      }
    }
    if (gt && hasDomLT && !lt && gtltComp !== 0) {
      return false;
    }
    if (lt && hasDomGT && !gt && gtltComp !== 0) {
      return false;
    }
    if (needDomGTPre || needDomLTPre) {
      return false;
    }
    return true;
  };
  const higherGT = (a, b, options) => {
    if (!a) {
      return b;
    }
    const comp = compare(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
  };
  const lowerLT = (a, b, options) => {
    if (!a) {
      return b;
    }
    const comp = compare(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
  };
  subset_1 = subset;
  return subset_1;
}
var semver$1;
var hasRequiredSemver;
function requireSemver() {
  if (hasRequiredSemver) return semver$1;
  hasRequiredSemver = 1;
  const internalRe = requireRe();
  const constants2 = requireConstants();
  const SemVer = requireSemver$1();
  const identifiers2 = requireIdentifiers();
  const parse = requireParse();
  const valid2 = requireValid$1();
  const clean = requireClean();
  const inc = requireInc();
  const diff = requireDiff();
  const major = requireMajor();
  const minor = requireMinor();
  const patch = requirePatch();
  const prerelease = requirePrerelease();
  const compare = requireCompare();
  const rcompare = requireRcompare();
  const compareLoose = requireCompareLoose();
  const compareBuild = requireCompareBuild();
  const sort = requireSort();
  const rsort = requireRsort();
  const gt = requireGt();
  const lt = requireLt();
  const eq = requireEq();
  const neq = requireNeq();
  const gte = requireGte();
  const lte = requireLte();
  const cmp = requireCmp();
  const coerce = requireCoerce();
  const Comparator = requireComparator();
  const Range = requireRange();
  const satisfies = requireSatisfies();
  const toComparators = requireToComparators();
  const maxSatisfying = requireMaxSatisfying();
  const minSatisfying = requireMinSatisfying();
  const minVersion = requireMinVersion();
  const validRange = requireValid();
  const outside = requireOutside();
  const gtr = requireGtr();
  const ltr = requireLtr();
  const intersects = requireIntersects();
  const simplifyRange = requireSimplify();
  const subset = requireSubset();
  semver$1 = {
    parse,
    valid: valid2,
    clean,
    inc,
    diff,
    major,
    minor,
    patch,
    prerelease,
    compare,
    rcompare,
    compareLoose,
    compareBuild,
    sort,
    rsort,
    gt,
    lt,
    eq,
    neq,
    gte,
    lte,
    cmp,
    coerce,
    Comparator,
    Range,
    satisfies,
    toComparators,
    maxSatisfying,
    minSatisfying,
    minVersion,
    validRange,
    outside,
    gtr,
    ltr,
    intersects,
    simplifyRange,
    subset,
    SemVer,
    re: internalRe.re,
    src: internalRe.src,
    tokens: internalRe.t,
    SEMVER_SPEC_VERSION: constants2.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: constants2.RELEASE_TYPES,
    compareIdentifiers: identifiers2.compareIdentifiers,
    rcompareIdentifiers: identifiers2.rcompareIdentifiers
  };
  return semver$1;
}
var semverExports = requireSemver();
const semver = /* @__PURE__ */ getDefaultExportFromCjs(semverExports);
export {
  semver as s
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhwYW5kVmlldy52dWVfdnVlX3R5cGVfc3R5bGVfaW5kZXhfMF9zY29wZWRfYjA5NWEyNWJfbGFuZy1DdUZhRjZLVS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9jb25zdGFudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2ludGVybmFsL2RlYnVnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9yZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvcGFyc2Utb3B0aW9ucy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvaWRlbnRpZmllcnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2NsYXNzZXMvc2VtdmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcGFyc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy92YWxpZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NsZWFuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvaW5jLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvZGlmZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL21ham9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvbWlub3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9wYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3ByZXJlbGVhc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jb21wYXJlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcmNvbXBhcmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jb21wYXJlLWxvb3NlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvY29tcGFyZS1idWlsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3NvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9yc29ydC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2d0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvbHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9lcS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL25lcS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2d0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2x0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NtcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NvZXJjZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvbHJ1Y2FjaGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2NsYXNzZXMvcmFuZ2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL2NsYXNzZXMvY29tcGFyYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3NhdGlzZmllcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3RvLWNvbXBhcmF0b3JzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvbWF4LXNhdGlzZnlpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9taW4tc2F0aXNmeWluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL21pbi12ZXJzaW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvdmFsaWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9vdXRzaWRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvZ3RyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvbHRyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvaW50ZXJzZWN0cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3NpbXBsaWZ5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvc3Vic2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuLy8gTm90ZTogdGhpcyBpcyB0aGUgc2VtdmVyLm9yZyB2ZXJzaW9uIG9mIHRoZSBzcGVjIHRoYXQgaXQgaW1wbGVtZW50c1xuLy8gTm90IG5lY2Vzc2FyaWx5IHRoZSBwYWNrYWdlIHZlcnNpb24gb2YgdGhpcyBjb2RlLlxuY29uc3QgU0VNVkVSX1NQRUNfVkVSU0lPTiA9ICcyLjAuMCdcblxuY29uc3QgTUFYX0xFTkdUSCA9IDI1NlxuY29uc3QgTUFYX1NBRkVfSU5URUdFUiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyA5MDA3MTk5MjU0NzQwOTkxXG5cbi8vIE1heCBzYWZlIHNlZ21lbnQgbGVuZ3RoIGZvciBjb2VyY2lvbi5cbmNvbnN0IE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggPSAxNlxuXG4vLyBNYXggc2FmZSBsZW5ndGggZm9yIGEgYnVpbGQgaWRlbnRpZmllci4gVGhlIG1heCBsZW5ndGggbWludXMgNiBjaGFyYWN0ZXJzIGZvclxuLy8gdGhlIHNob3J0ZXN0IHZlcnNpb24gd2l0aCBhIGJ1aWxkIDAuMC4wK0JVSUxELlxuY29uc3QgTUFYX1NBRkVfQlVJTERfTEVOR1RIID0gTUFYX0xFTkdUSCAtIDZcblxuY29uc3QgUkVMRUFTRV9UWVBFUyA9IFtcbiAgJ21ham9yJyxcbiAgJ3ByZW1ham9yJyxcbiAgJ21pbm9yJyxcbiAgJ3ByZW1pbm9yJyxcbiAgJ3BhdGNoJyxcbiAgJ3ByZXBhdGNoJyxcbiAgJ3ByZXJlbGVhc2UnLFxuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTUFYX0xFTkdUSCxcbiAgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCxcbiAgTUFYX1NBRkVfQlVJTERfTEVOR1RILFxuICBNQVhfU0FGRV9JTlRFR0VSLFxuICBSRUxFQVNFX1RZUEVTLFxuICBTRU1WRVJfU1BFQ19WRVJTSU9OLFxuICBGTEFHX0lOQ0xVREVfUFJFUkVMRUFTRTogMGIwMDEsXG4gIEZMQUdfTE9PU0U6IDBiMDEwLFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGRlYnVnID0gKFxuICB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiZcbiAgcHJvY2Vzcy5lbnYgJiZcbiAgcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJlxuICAvXFxic2VtdmVyXFxiL2kudGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKVxuKSA/ICguLi5hcmdzKSA9PiBjb25zb2xlLmVycm9yKCdTRU1WRVInLCAuLi5hcmdzKVxuICA6ICgpID0+IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZGVidWdcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7XG4gIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEgsXG4gIE1BWF9TQUZFX0JVSUxEX0xFTkdUSCxcbiAgTUFYX0xFTkdUSCxcbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4vZGVidWcnKVxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0ge31cblxuLy8gVGhlIGFjdHVhbCByZWdleHBzIGdvIG9uIGV4cG9ydHMucmVcbmNvbnN0IHJlID0gZXhwb3J0cy5yZSA9IFtdXG5jb25zdCBzYWZlUmUgPSBleHBvcnRzLnNhZmVSZSA9IFtdXG5jb25zdCBzcmMgPSBleHBvcnRzLnNyYyA9IFtdXG5jb25zdCBzYWZlU3JjID0gZXhwb3J0cy5zYWZlU3JjID0gW11cbmNvbnN0IHQgPSBleHBvcnRzLnQgPSB7fVxubGV0IFIgPSAwXG5cbmNvbnN0IExFVFRFUkRBU0hOVU1CRVIgPSAnW2EtekEtWjAtOS1dJ1xuXG4vLyBSZXBsYWNlIHNvbWUgZ3JlZWR5IHJlZ2V4IHRva2VucyB0byBwcmV2ZW50IHJlZ2V4IGRvcyBpc3N1ZXMuIFRoZXNlIHJlZ2V4IGFyZVxuLy8gdXNlZCBpbnRlcm5hbGx5IHZpYSB0aGUgc2FmZVJlIG9iamVjdCBzaW5jZSBhbGwgaW5wdXRzIGluIHRoaXMgbGlicmFyeSBnZXRcbi8vIG5vcm1hbGl6ZWQgZmlyc3QgdG8gdHJpbSBhbmQgY29sbGFwc2UgYWxsIGV4dHJhIHdoaXRlc3BhY2UuIFRoZSBvcmlnaW5hbFxuLy8gcmVnZXhlcyBhcmUgZXhwb3J0ZWQgZm9yIHVzZXJsYW5kIGNvbnN1bXB0aW9uIGFuZCBsb3dlciBsZXZlbCB1c2FnZS4gQVxuLy8gZnV0dXJlIGJyZWFraW5nIGNoYW5nZSBjb3VsZCBleHBvcnQgdGhlIHNhZmVyIHJlZ2V4IG9ubHkgd2l0aCBhIG5vdGUgdGhhdFxuLy8gYWxsIGlucHV0IHNob3VsZCBoYXZlIGV4dHJhIHdoaXRlc3BhY2UgcmVtb3ZlZC5cbmNvbnN0IHNhZmVSZWdleFJlcGxhY2VtZW50cyA9IFtcbiAgWydcXFxccycsIDFdLFxuICBbJ1xcXFxkJywgTUFYX0xFTkdUSF0sXG4gIFtMRVRURVJEQVNITlVNQkVSLCBNQVhfU0FGRV9CVUlMRF9MRU5HVEhdLFxuXVxuXG5jb25zdCBtYWtlU2FmZVJlZ2V4ID0gKHZhbHVlKSA9PiB7XG4gIGZvciAoY29uc3QgW3Rva2VuLCBtYXhdIG9mIHNhZmVSZWdleFJlcGxhY2VtZW50cykge1xuICAgIHZhbHVlID0gdmFsdWVcbiAgICAgIC5zcGxpdChgJHt0b2tlbn0qYCkuam9pbihgJHt0b2tlbn17MCwke21heH19YClcbiAgICAgIC5zcGxpdChgJHt0b2tlbn0rYCkuam9pbihgJHt0b2tlbn17MSwke21heH19YClcbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuY29uc3QgY3JlYXRlVG9rZW4gPSAobmFtZSwgdmFsdWUsIGlzR2xvYmFsKSA9PiB7XG4gIGNvbnN0IHNhZmUgPSBtYWtlU2FmZVJlZ2V4KHZhbHVlKVxuICBjb25zdCBpbmRleCA9IFIrK1xuICBkZWJ1ZyhuYW1lLCBpbmRleCwgdmFsdWUpXG4gIHRbbmFtZV0gPSBpbmRleFxuICBzcmNbaW5kZXhdID0gdmFsdWVcbiAgc2FmZVNyY1tpbmRleF0gPSBzYWZlXG4gIHJlW2luZGV4XSA9IG5ldyBSZWdFeHAodmFsdWUsIGlzR2xvYmFsID8gJ2cnIDogdW5kZWZpbmVkKVxuICBzYWZlUmVbaW5kZXhdID0gbmV3IFJlZ0V4cChzYWZlLCBpc0dsb2JhbCA/ICdnJyA6IHVuZGVmaW5lZClcbn1cblxuLy8gVGhlIGZvbGxvd2luZyBSZWd1bGFyIEV4cHJlc3Npb25zIGNhbiBiZSB1c2VkIGZvciB0b2tlbml6aW5nLFxuLy8gdmFsaWRhdGluZywgYW5kIHBhcnNpbmcgU2VtVmVyIHZlcnNpb24gc3RyaW5ncy5cblxuLy8gIyMgTnVtZXJpYyBJZGVudGlmaWVyXG4vLyBBIHNpbmdsZSBgMGAsIG9yIGEgbm9uLXplcm8gZGlnaXQgZm9sbG93ZWQgYnkgemVybyBvciBtb3JlIGRpZ2l0cy5cblxuY3JlYXRlVG9rZW4oJ05VTUVSSUNJREVOVElGSUVSJywgJzB8WzEtOV1cXFxcZConKVxuY3JlYXRlVG9rZW4oJ05VTUVSSUNJREVOVElGSUVSTE9PU0UnLCAnXFxcXGQrJylcblxuLy8gIyMgTm9uLW51bWVyaWMgSWRlbnRpZmllclxuLy8gWmVybyBvciBtb3JlIGRpZ2l0cywgZm9sbG93ZWQgYnkgYSBsZXR0ZXIgb3IgaHlwaGVuLCBhbmQgdGhlbiB6ZXJvIG9yXG4vLyBtb3JlIGxldHRlcnMsIGRpZ2l0cywgb3IgaHlwaGVucy5cblxuY3JlYXRlVG9rZW4oJ05PTk5VTUVSSUNJREVOVElGSUVSJywgYFxcXFxkKlthLXpBLVotXSR7TEVUVEVSREFTSE5VTUJFUn0qYClcblxuLy8gIyMgTWFpbiBWZXJzaW9uXG4vLyBUaHJlZSBkb3Qtc2VwYXJhdGVkIG51bWVyaWMgaWRlbnRpZmllcnMuXG5cbmNyZWF0ZVRva2VuKCdNQUlOVkVSU0lPTicsIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgYCgke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSXX0pXFxcXC5gICtcbiAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdfSlgKVxuXG5jcmVhdGVUb2tlbignTUFJTlZFUlNJT05MT09TRScsIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX0pXFxcXC5gICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX0pXFxcXC5gICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX0pYClcblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvbiBJZGVudGlmaWVyXG4vLyBBIG51bWVyaWMgaWRlbnRpZmllciwgb3IgYSBub24tbnVtZXJpYyBpZGVudGlmaWVyLlxuLy8gTm9uLW51bWJlcmljIGlkZW50aWZpZXJzIGluY2x1ZGUgbnVtYmVyaWMgaWRlbnRpZmllcnMgYnV0IGNhbiBiZSBsb25nZXIuXG4vLyBUaGVyZWZvcmUgbm9uLW51bWJlcmljIGlkZW50aWZpZXJzIG11c3QgZ28gZmlyc3QuXG5cbmNyZWF0ZVRva2VuKCdQUkVSRUxFQVNFSURFTlRJRklFUicsIGAoPzoke3NyY1t0Lk5PTk5VTUVSSUNJREVOVElGSUVSXVxufXwke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSXX0pYClcblxuY3JlYXRlVG9rZW4oJ1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0UnLCBgKD86JHtzcmNbdC5OT05OVU1FUklDSURFTlRJRklFUl1cbn18JHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX0pYClcblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvblxuLy8gSHlwaGVuLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBkb3Qtc2VwYXJhdGVkIHByZS1yZWxlYXNlIHZlcnNpb25cbi8vIGlkZW50aWZpZXJzLlxuXG5jcmVhdGVUb2tlbignUFJFUkVMRUFTRScsIGAoPzotKCR7c3JjW3QuUFJFUkVMRUFTRUlERU5USUZJRVJdXG59KD86XFxcXC4ke3NyY1t0LlBSRVJFTEVBU0VJREVOVElGSUVSXX0pKikpYClcblxuY3JlYXRlVG9rZW4oJ1BSRVJFTEVBU0VMT09TRScsIGAoPzotPygke3NyY1t0LlBSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdXG59KD86XFxcXC4ke3NyY1t0LlBSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdfSkqKSlgKVxuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YSBJZGVudGlmaWVyXG4vLyBBbnkgY29tYmluYXRpb24gb2YgZGlnaXRzLCBsZXR0ZXJzLCBvciBoeXBoZW5zLlxuXG5jcmVhdGVUb2tlbignQlVJTERJREVOVElGSUVSJywgYCR7TEVUVEVSREFTSE5VTUJFUn0rYClcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGFcbi8vIFBsdXMgc2lnbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgcGVyaW9kLXNlcGFyYXRlZCBidWlsZCBtZXRhZGF0YVxuLy8gaWRlbnRpZmllcnMuXG5cbmNyZWF0ZVRva2VuKCdCVUlMRCcsIGAoPzpcXFxcKygke3NyY1t0LkJVSUxESURFTlRJRklFUl1cbn0oPzpcXFxcLiR7c3JjW3QuQlVJTERJREVOVElGSUVSXX0pKikpYClcblxuLy8gIyMgRnVsbCBWZXJzaW9uIFN0cmluZ1xuLy8gQSBtYWluIHZlcnNpb24sIGZvbGxvd2VkIG9wdGlvbmFsbHkgYnkgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uIGFuZFxuLy8gYnVpbGQgbWV0YWRhdGEuXG5cbi8vIE5vdGUgdGhhdCB0aGUgb25seSBtYWpvciwgbWlub3IsIHBhdGNoLCBhbmQgcHJlLXJlbGVhc2Ugc2VjdGlvbnMgb2Zcbi8vIHRoZSB2ZXJzaW9uIHN0cmluZyBhcmUgY2FwdHVyaW5nIGdyb3Vwcy4gIFRoZSBidWlsZCBtZXRhZGF0YSBpcyBub3QgYVxuLy8gY2FwdHVyaW5nIGdyb3VwLCBiZWNhdXNlIGl0IHNob3VsZCBub3QgZXZlciBiZSB1c2VkIGluIHZlcnNpb25cbi8vIGNvbXBhcmlzb24uXG5cbmNyZWF0ZVRva2VuKCdGVUxMUExBSU4nLCBgdj8ke3NyY1t0Lk1BSU5WRVJTSU9OXVxufSR7c3JjW3QuUFJFUkVMRUFTRV19PyR7XG4gIHNyY1t0LkJVSUxEXX0/YClcblxuY3JlYXRlVG9rZW4oJ0ZVTEwnLCBgXiR7c3JjW3QuRlVMTFBMQUlOXX0kYClcblxuLy8gbGlrZSBmdWxsLCBidXQgYWxsb3dzIHYxLjIuMyBhbmQgPTEuMi4zLCB3aGljaCBwZW9wbGUgZG8gc29tZXRpbWVzLlxuLy8gYWxzbywgMS4wLjBhbHBoYTEgKHByZXJlbGVhc2Ugd2l0aG91dCB0aGUgaHlwaGVuKSB3aGljaCBpcyBwcmV0dHlcbi8vIGNvbW1vbiBpbiB0aGUgbnBtIHJlZ2lzdHJ5LlxuY3JlYXRlVG9rZW4oJ0xPT1NFUExBSU4nLCBgW3Y9XFxcXHNdKiR7c3JjW3QuTUFJTlZFUlNJT05MT09TRV1cbn0ke3NyY1t0LlBSRVJFTEVBU0VMT09TRV19PyR7XG4gIHNyY1t0LkJVSUxEXX0/YClcblxuY3JlYXRlVG9rZW4oJ0xPT1NFJywgYF4ke3NyY1t0LkxPT1NFUExBSU5dfSRgKVxuXG5jcmVhdGVUb2tlbignR1RMVCcsICcoKD86PHw+KT89PyknKVxuXG4vLyBTb21ldGhpbmcgbGlrZSBcIjIuKlwiIG9yIFwiMS4yLnhcIi5cbi8vIE5vdGUgdGhhdCBcIngueFwiIGlzIGEgdmFsaWQgeFJhbmdlIGlkZW50aWZlciwgbWVhbmluZyBcImFueSB2ZXJzaW9uXCJcbi8vIE9ubHkgdGhlIGZpcnN0IGl0ZW0gaXMgc3RyaWN0bHkgcmVxdWlyZWQuXG5jcmVhdGVUb2tlbignWFJBTkdFSURFTlRJRklFUkxPT1NFJywgYCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19fHh8WHxcXFxcKmApXG5jcmVhdGVUb2tlbignWFJBTkdFSURFTlRJRklFUicsIGAke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSXX18eHxYfFxcXFwqYClcblxuY3JlYXRlVG9rZW4oJ1hSQU5HRVBMQUlOJywgYFt2PVxcXFxzXSooJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSXX0pYCArXG4gICAgICAgICAgICAgICAgICAgYCg/OlxcXFwuKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGAoPzpcXFxcLigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJdfSlgICtcbiAgICAgICAgICAgICAgICAgICBgKD86JHtzcmNbdC5QUkVSRUxFQVNFXX0pPyR7XG4gICAgICAgICAgICAgICAgICAgICBzcmNbdC5CVUlMRF19P2AgK1xuICAgICAgICAgICAgICAgICAgIGApPyk/YClcblxuY3JlYXRlVG9rZW4oJ1hSQU5HRVBMQUlOTE9PU0UnLCBgW3Y9XFxcXHNdKigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJMT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCg/OlxcXFwuKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUkxPT1NFXX0pYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKD86XFxcXC4oJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSTE9PU0VdfSlgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoPzoke3NyY1t0LlBSRVJFTEVBU0VMT09TRV19KT8ke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNbdC5CVUlMRF19P2AgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCk/KT9gKVxuXG5jcmVhdGVUb2tlbignWFJBTkdFJywgYF4ke3NyY1t0LkdUTFRdfVxcXFxzKiR7c3JjW3QuWFJBTkdFUExBSU5dfSRgKVxuY3JlYXRlVG9rZW4oJ1hSQU5HRUxPT1NFJywgYF4ke3NyY1t0LkdUTFRdfVxcXFxzKiR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19JGApXG5cbi8vIENvZXJjaW9uLlxuLy8gRXh0cmFjdCBhbnl0aGluZyB0aGF0IGNvdWxkIGNvbmNlaXZhYmx5IGJlIGEgcGFydCBvZiBhIHZhbGlkIHNlbXZlclxuY3JlYXRlVG9rZW4oJ0NPRVJDRVBMQUlOJywgYCR7JyhefFteXFxcXGRdKScgK1xuICAgICAgICAgICAgICAnKFxcXFxkezEsJ30ke01BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEh9fSlgICtcbiAgICAgICAgICAgICAgYCg/OlxcXFwuKFxcXFxkezEsJHtNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIfX0pKT9gICtcbiAgICAgICAgICAgICAgYCg/OlxcXFwuKFxcXFxkezEsJHtNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIfX0pKT9gKVxuY3JlYXRlVG9rZW4oJ0NPRVJDRScsIGAke3NyY1t0LkNPRVJDRVBMQUlOXX0oPzokfFteXFxcXGRdKWApXG5jcmVhdGVUb2tlbignQ09FUkNFRlVMTCcsIHNyY1t0LkNPRVJDRVBMQUlOXSArXG4gICAgICAgICAgICAgIGAoPzoke3NyY1t0LlBSRVJFTEVBU0VdfSk/YCArXG4gICAgICAgICAgICAgIGAoPzoke3NyY1t0LkJVSUxEXX0pP2AgK1xuICAgICAgICAgICAgICBgKD86JHxbXlxcXFxkXSlgKVxuY3JlYXRlVG9rZW4oJ0NPRVJDRVJUTCcsIHNyY1t0LkNPRVJDRV0sIHRydWUpXG5jcmVhdGVUb2tlbignQ09FUkNFUlRMRlVMTCcsIHNyY1t0LkNPRVJDRUZVTExdLCB0cnVlKVxuXG4vLyBUaWxkZSByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwicmVhc29uYWJseSBhdCBvciBncmVhdGVyIHRoYW5cIlxuY3JlYXRlVG9rZW4oJ0xPTkVUSUxERScsICcoPzp+Pj8pJylcblxuY3JlYXRlVG9rZW4oJ1RJTERFVFJJTScsIGAoXFxcXHMqKSR7c3JjW3QuTE9ORVRJTERFXX1cXFxccytgLCB0cnVlKVxuZXhwb3J0cy50aWxkZVRyaW1SZXBsYWNlID0gJyQxfidcblxuY3JlYXRlVG9rZW4oJ1RJTERFJywgYF4ke3NyY1t0LkxPTkVUSUxERV19JHtzcmNbdC5YUkFOR0VQTEFJTl19JGApXG5jcmVhdGVUb2tlbignVElMREVMT09TRScsIGBeJHtzcmNbdC5MT05FVElMREVdfSR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19JGApXG5cbi8vIENhcmV0IHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJhdCBsZWFzdCBhbmQgYmFja3dhcmRzIGNvbXBhdGlibGUgd2l0aFwiXG5jcmVhdGVUb2tlbignTE9ORUNBUkVUJywgJyg/OlxcXFxeKScpXG5cbmNyZWF0ZVRva2VuKCdDQVJFVFRSSU0nLCBgKFxcXFxzKikke3NyY1t0LkxPTkVDQVJFVF19XFxcXHMrYCwgdHJ1ZSlcbmV4cG9ydHMuY2FyZXRUcmltUmVwbGFjZSA9ICckMV4nXG5cbmNyZWF0ZVRva2VuKCdDQVJFVCcsIGBeJHtzcmNbdC5MT05FQ0FSRVRdfSR7c3JjW3QuWFJBTkdFUExBSU5dfSRgKVxuY3JlYXRlVG9rZW4oJ0NBUkVUTE9PU0UnLCBgXiR7c3JjW3QuTE9ORUNBUkVUXX0ke3NyY1t0LlhSQU5HRVBMQUlOTE9PU0VdfSRgKVxuXG4vLyBBIHNpbXBsZSBndC9sdC9lcSB0aGluZywgb3IganVzdCBcIlwiIHRvIGluZGljYXRlIFwiYW55IHZlcnNpb25cIlxuY3JlYXRlVG9rZW4oJ0NPTVBBUkFUT1JMT09TRScsIGBeJHtzcmNbdC5HVExUXX1cXFxccyooJHtzcmNbdC5MT09TRVBMQUlOXX0pJHxeJGApXG5jcmVhdGVUb2tlbignQ09NUEFSQVRPUicsIGBeJHtzcmNbdC5HVExUXX1cXFxccyooJHtzcmNbdC5GVUxMUExBSU5dfSkkfF4kYClcblxuLy8gQW4gZXhwcmVzc2lvbiB0byBzdHJpcCBhbnkgd2hpdGVzcGFjZSBiZXR3ZWVuIHRoZSBndGx0IGFuZCB0aGUgdGhpbmdcbi8vIGl0IG1vZGlmaWVzLCBzbyB0aGF0IGA+IDEuMi4zYCA9PT4gYD4xLjIuM2BcbmNyZWF0ZVRva2VuKCdDT01QQVJBVE9SVFJJTScsIGAoXFxcXHMqKSR7c3JjW3QuR1RMVF1cbn1cXFxccyooJHtzcmNbdC5MT09TRVBMQUlOXX18JHtzcmNbdC5YUkFOR0VQTEFJTl19KWAsIHRydWUpXG5leHBvcnRzLmNvbXBhcmF0b3JUcmltUmVwbGFjZSA9ICckMSQyJDMnXG5cbi8vIFNvbWV0aGluZyBsaWtlIGAxLjIuMyAtIDEuMi40YFxuLy8gTm90ZSB0aGF0IHRoZXNlIGFsbCB1c2UgdGhlIGxvb3NlIGZvcm0sIGJlY2F1c2UgdGhleSdsbCBiZVxuLy8gY2hlY2tlZCBhZ2FpbnN0IGVpdGhlciB0aGUgc3RyaWN0IG9yIGxvb3NlIGNvbXBhcmF0b3IgZm9ybVxuLy8gbGF0ZXIuXG5jcmVhdGVUb2tlbignSFlQSEVOUkFOR0UnLCBgXlxcXFxzKigke3NyY1t0LlhSQU5HRVBMQUlOXX0pYCArXG4gICAgICAgICAgICAgICAgICAgYFxcXFxzKy1cXFxccytgICtcbiAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuWFJBTkdFUExBSU5dfSlgICtcbiAgICAgICAgICAgICAgICAgICBgXFxcXHMqJGApXG5cbmNyZWF0ZVRva2VuKCdIWVBIRU5SQU5HRUxPT1NFJywgYF5cXFxccyooJHtzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXX0pYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgXFxcXHMrLVxcXFxzK2AgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCgke3NyY1t0LlhSQU5HRVBMQUlOTE9PU0VdfSlgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBcXFxccyokYClcblxuLy8gU3RhciByYW5nZXMgYmFzaWNhbGx5IGp1c3QgYWxsb3cgYW55dGhpbmcgYXQgYWxsLlxuY3JlYXRlVG9rZW4oJ1NUQVInLCAnKDx8Pik/PT9cXFxccypcXFxcKicpXG4vLyA+PTAuMC4wIGlzIGxpa2UgYSBzdGFyXG5jcmVhdGVUb2tlbignR1RFMCcsICdeXFxcXHMqPj1cXFxccyowXFxcXC4wXFxcXC4wXFxcXHMqJCcpXG5jcmVhdGVUb2tlbignR1RFMFBSRScsICdeXFxcXHMqPj1cXFxccyowXFxcXC4wXFxcXC4wLTBcXFxccyokJylcbiIsIid1c2Ugc3RyaWN0J1xuXG4vLyBwYXJzZSBvdXQganVzdCB0aGUgb3B0aW9ucyB3ZSBjYXJlIGFib3V0XG5jb25zdCBsb29zZU9wdGlvbiA9IE9iamVjdC5mcmVlemUoeyBsb29zZTogdHJ1ZSB9KVxuY29uc3QgZW1wdHlPcHRzID0gT2JqZWN0LmZyZWV6ZSh7IH0pXG5jb25zdCBwYXJzZU9wdGlvbnMgPSBvcHRpb25zID0+IHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgcmV0dXJuIGVtcHR5T3B0c1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBsb29zZU9wdGlvblxuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnNcbn1cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VPcHRpb25zXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgbnVtZXJpYyA9IC9eWzAtOV0rJC9cbmNvbnN0IGNvbXBhcmVJZGVudGlmaWVycyA9IChhLCBiKSA9PiB7XG4gIGNvbnN0IGFudW0gPSBudW1lcmljLnRlc3QoYSlcbiAgY29uc3QgYm51bSA9IG51bWVyaWMudGVzdChiKVxuXG4gIGlmIChhbnVtICYmIGJudW0pIHtcbiAgICBhID0gK2FcbiAgICBiID0gK2JcbiAgfVxuXG4gIHJldHVybiBhID09PSBiID8gMFxuICAgIDogKGFudW0gJiYgIWJudW0pID8gLTFcbiAgICA6IChibnVtICYmICFhbnVtKSA/IDFcbiAgICA6IGEgPCBiID8gLTFcbiAgICA6IDFcbn1cblxuY29uc3QgcmNvbXBhcmVJZGVudGlmaWVycyA9IChhLCBiKSA9PiBjb21wYXJlSWRlbnRpZmllcnMoYiwgYSlcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbXBhcmVJZGVudGlmaWVycyxcbiAgcmNvbXBhcmVJZGVudGlmaWVycyxcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2RlYnVnJylcbmNvbnN0IHsgTUFYX0xFTkdUSCwgTUFYX1NBRkVfSU5URUdFUiB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY29uc3RhbnRzJylcbmNvbnN0IHsgc2FmZVJlOiByZSwgdCB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuXG5jb25zdCBwYXJzZU9wdGlvbnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9wYXJzZS1vcHRpb25zJylcbmNvbnN0IHsgY29tcGFyZUlkZW50aWZpZXJzIH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pZGVudGlmaWVycycpXG5jbGFzcyBTZW1WZXIge1xuICBjb25zdHJ1Y3RvciAodmVyc2lvbiwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMob3B0aW9ucylcblxuICAgIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgICBpZiAodmVyc2lvbi5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlICYmXG4gICAgICAgIHZlcnNpb24uaW5jbHVkZVByZXJlbGVhc2UgPT09ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgICAgICByZXR1cm4gdmVyc2lvblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmVyc2lvbiA9IHZlcnNpb24udmVyc2lvblxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIHZlcnNpb24uIE11c3QgYmUgYSBzdHJpbmcuIEdvdCB0eXBlIFwiJHt0eXBlb2YgdmVyc2lvbn1cIi5gKVxuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIGB2ZXJzaW9uIGlzIGxvbmdlciB0aGFuICR7TUFYX0xFTkdUSH0gY2hhcmFjdGVyc2BcbiAgICAgIClcbiAgICB9XG5cbiAgICBkZWJ1ZygnU2VtVmVyJywgdmVyc2lvbiwgb3B0aW9ucylcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuICAgIC8vIHRoaXMgaXNuJ3QgYWN0dWFsbHkgcmVsZXZhbnQgZm9yIHZlcnNpb25zLCBidXQga2VlcCBpdCBzbyB0aGF0IHdlXG4gICAgLy8gZG9uJ3QgcnVuIGludG8gdHJvdWJsZSBwYXNzaW5nIHRoaXMub3B0aW9ucyBhcm91bmQuXG4gICAgdGhpcy5pbmNsdWRlUHJlcmVsZWFzZSA9ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZVxuXG4gICAgY29uc3QgbSA9IHZlcnNpb24udHJpbSgpLm1hdGNoKG9wdGlvbnMubG9vc2UgPyByZVt0LkxPT1NFXSA6IHJlW3QuRlVMTF0pXG5cbiAgICBpZiAoIW0pIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgVmVyc2lvbjogJHt2ZXJzaW9ufWApXG4gICAgfVxuXG4gICAgdGhpcy5yYXcgPSB2ZXJzaW9uXG5cbiAgICAvLyB0aGVzZSBhcmUgYWN0dWFsbHkgbnVtYmVyc1xuICAgIHRoaXMubWFqb3IgPSArbVsxXVxuICAgIHRoaXMubWlub3IgPSArbVsyXVxuICAgIHRoaXMucGF0Y2ggPSArbVszXVxuXG4gICAgaWYgKHRoaXMubWFqb3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWFqb3IgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1ham9yIHZlcnNpb24nKVxuICAgIH1cblxuICAgIGlmICh0aGlzLm1pbm9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1pbm9yIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtaW5vciB2ZXJzaW9uJylcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXRjaCA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5wYXRjaCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcGF0Y2ggdmVyc2lvbicpXG4gICAgfVxuXG4gICAgLy8gbnVtYmVyaWZ5IGFueSBwcmVyZWxlYXNlIG51bWVyaWMgaWRzXG4gICAgaWYgKCFtWzRdKSB7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBtWzRdLnNwbGl0KCcuJykubWFwKChpZCkgPT4ge1xuICAgICAgICBpZiAoL15bMC05XSskLy50ZXN0KGlkKSkge1xuICAgICAgICAgIGNvbnN0IG51bSA9ICtpZFxuICAgICAgICAgIGlmIChudW0gPj0gMCAmJiBudW0gPCBNQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZFxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmJ1aWxkID0gbVs1XSA/IG1bNV0uc3BsaXQoJy4nKSA6IFtdXG4gICAgdGhpcy5mb3JtYXQoKVxuICB9XG5cbiAgZm9ybWF0ICgpIHtcbiAgICB0aGlzLnZlcnNpb24gPSBgJHt0aGlzLm1ham9yfS4ke3RoaXMubWlub3J9LiR7dGhpcy5wYXRjaH1gXG4gICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIHRoaXMudmVyc2lvbiArPSBgLSR7dGhpcy5wcmVyZWxlYXNlLmpvaW4oJy4nKX1gXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZlcnNpb25cbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJzaW9uXG4gIH1cblxuICBjb21wYXJlIChvdGhlcikge1xuICAgIGRlYnVnKCdTZW1WZXIuY29tcGFyZScsIHRoaXMudmVyc2lvbiwgdGhpcy5vcHRpb25zLCBvdGhlcilcbiAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3RoZXIgPT09ICdzdHJpbmcnICYmIG90aGVyID09PSB0aGlzLnZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH1cbiAgICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICAgIH1cblxuICAgIGlmIChvdGhlci52ZXJzaW9uID09PSB0aGlzLnZlcnNpb24pIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29tcGFyZU1haW4ob3RoZXIpIHx8IHRoaXMuY29tcGFyZVByZShvdGhlcilcbiAgfVxuXG4gIGNvbXBhcmVNYWluIChvdGhlcikge1xuICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1ham9yLCBvdGhlci5tYWpvcikgfHxcbiAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1pbm9yLCBvdGhlci5taW5vcikgfHxcbiAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLnBhdGNoLCBvdGhlci5wYXRjaClcbiAgICApXG4gIH1cblxuICBjb21wYXJlUHJlIChvdGhlcikge1xuICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gICAgfVxuXG4gICAgLy8gTk9UIGhhdmluZyBhIHByZXJlbGVhc2UgaXMgPiBoYXZpbmcgb25lXG4gICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmIG90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cblxuICAgIGxldCBpID0gMFxuICAgIGRvIHtcbiAgICAgIGNvbnN0IGEgPSB0aGlzLnByZXJlbGVhc2VbaV1cbiAgICAgIGNvbnN0IGIgPSBvdGhlci5wcmVyZWxlYXNlW2ldXG4gICAgICBkZWJ1ZygncHJlcmVsZWFzZSBjb21wYXJlJywgaSwgYSwgYilcbiAgICAgIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9IGVsc2UgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMVxuICAgICAgfSBlbHNlIGlmIChhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9IGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYilcbiAgICAgIH1cbiAgICB9IHdoaWxlICgrK2kpXG4gIH1cblxuICBjb21wYXJlQnVpbGQgKG90aGVyKSB7XG4gICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgICB9XG5cbiAgICBsZXQgaSA9IDBcbiAgICBkbyB7XG4gICAgICBjb25zdCBhID0gdGhpcy5idWlsZFtpXVxuICAgICAgY29uc3QgYiA9IG90aGVyLmJ1aWxkW2ldXG4gICAgICBkZWJ1ZygnYnVpbGQgY29tcGFyZScsIGksIGEsIGIpXG4gICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfSBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfSBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpXG4gICAgICB9XG4gICAgfSB3aGlsZSAoKytpKVxuICB9XG5cbiAgLy8gcHJlbWlub3Igd2lsbCBidW1wIHRoZSB2ZXJzaW9uIHVwIHRvIHRoZSBuZXh0IG1pbm9yIHJlbGVhc2UsIGFuZCBpbW1lZGlhdGVseVxuICAvLyBkb3duIHRvIHByZS1yZWxlYXNlLiBwcmVtYWpvciBhbmQgcHJlcGF0Y2ggd29yayB0aGUgc2FtZSB3YXkuXG4gIGluYyAocmVsZWFzZSwgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpIHtcbiAgICBpZiAocmVsZWFzZS5zdGFydHNXaXRoKCdwcmUnKSkge1xuICAgICAgaWYgKCFpZGVudGlmaWVyICYmIGlkZW50aWZpZXJCYXNlID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5jcmVtZW50IGFyZ3VtZW50OiBpZGVudGlmaWVyIGlzIGVtcHR5JylcbiAgICAgIH1cbiAgICAgIC8vIEF2b2lkIGFuIGludmFsaWQgc2VtdmVyIHJlc3VsdHNcbiAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gYC0ke2lkZW50aWZpZXJ9YC5tYXRjaCh0aGlzLm9wdGlvbnMubG9vc2UgPyByZVt0LlBSRVJFTEVBU0VMT09TRV0gOiByZVt0LlBSRVJFTEVBU0VdKVxuICAgICAgICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdICE9PSBpZGVudGlmaWVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGlkZW50aWZpZXI6ICR7aWRlbnRpZmllcn1gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoIChyZWxlYXNlKSB7XG4gICAgICBjYXNlICdwcmVtYWpvcic6XG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICAgIHRoaXMubWlub3IgPSAwXG4gICAgICAgIHRoaXMubWFqb3IrK1xuICAgICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdwcmVtaW5vcic6XG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICAgIHRoaXMubWlub3IrK1xuICAgICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdwcmVwYXRjaCc6XG4gICAgICAgIC8vIElmIHRoaXMgaXMgYWxyZWFkeSBhIHByZXJlbGVhc2UsIGl0IHdpbGwgYnVtcCB0byB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAgIC8vIGRyb3AgYW55IHByZXJlbGVhc2VzIHRoYXQgbWlnaHQgYWxyZWFkeSBleGlzdCwgc2luY2UgdGhleSBhcmUgbm90XG4gICAgICAgIC8vIHJlbGV2YW50IGF0IHRoaXMgcG9pbnQuXG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIsIGlkZW50aWZpZXJCYXNlKVxuICAgICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpXG4gICAgICAgIGJyZWFrXG4gICAgICAvLyBJZiB0aGUgaW5wdXQgaXMgYSBub24tcHJlcmVsZWFzZSB2ZXJzaW9uLCB0aGlzIGFjdHMgdGhlIHNhbWUgYXNcbiAgICAgIC8vIHByZXBhdGNoLlxuICAgICAgY2FzZSAncHJlcmVsZWFzZSc6XG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIsIGlkZW50aWZpZXJCYXNlKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAncmVsZWFzZSc6XG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB2ZXJzaW9uICR7dGhpcy5yYXd9IGlzIG5vdCBhIHByZXJlbGVhc2VgKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ21ham9yJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1tYWpvciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1ham9yIHZlcnNpb24uXG4gICAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAgIC8vIDEuMC4wLTUgYnVtcHMgdG8gMS4wLjBcbiAgICAgICAgLy8gMS4xLjAgYnVtcHMgdG8gMi4wLjBcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMubWlub3IgIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnBhdGNoICE9PSAwIHx8XG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1ham9yKytcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1pbm9yID0gMFxuICAgICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbWlub3InOlxuICAgICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtaW5vci5cbiAgICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgICBpZiAodGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5taW5vcisrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5wYXRjaCsrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgICAgYnJlYWtcbiAgICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgICAvLyAxLjAuMCAncHJlJyB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgICAgY2FzZSAncHJlJzoge1xuICAgICAgICBjb25zdCBiYXNlID0gTnVtYmVyKGlkZW50aWZpZXJCYXNlKSA/IDEgOiAwXG5cbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbYmFzZV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgaSA9IHRoaXMucHJlcmVsZWFzZS5sZW5ndGhcbiAgICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcmVyZWxlYXNlW2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2VbaV0rK1xuICAgICAgICAgICAgICBpID0gLTJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgICBpZiAoaWRlbnRpZmllciA9PT0gdGhpcy5wcmVyZWxlYXNlLmpvaW4oJy4nKSAmJiBpZGVudGlmaWVyQmFzZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogaWRlbnRpZmllciBhbHJlYWR5IGV4aXN0cycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UucHVzaChiYXNlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaWRlbnRpZmllcikge1xuICAgICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgICAgLy8gMS4yLjAtYmV0YS5mb29ibHogb3IgMS4yLjAtYmV0YSBidW1wcyB0byAxLjIuMC1iZXRhLjBcbiAgICAgICAgICBsZXQgcHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCBiYXNlXVxuICAgICAgICAgIGlmIChpZGVudGlmaWVyQmFzZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByZXJlbGVhc2UgPSBbaWRlbnRpZmllcl1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLnByZXJlbGVhc2VbMF0sIGlkZW50aWZpZXIpID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSkge1xuICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBwcmVyZWxlYXNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IHByZXJlbGVhc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6ICR7cmVsZWFzZX1gKVxuICAgIH1cbiAgICB0aGlzLnJhdyA9IHRoaXMuZm9ybWF0KClcbiAgICBpZiAodGhpcy5idWlsZC5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmF3ICs9IGArJHt0aGlzLmJ1aWxkLmpvaW4oJy4nKX1gXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZW1WZXJcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBwYXJzZSA9ICh2ZXJzaW9uLCBvcHRpb25zLCB0aHJvd0Vycm9ycyA9IGZhbHNlKSA9PiB7XG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgcmV0dXJuIHZlcnNpb25cbiAgfVxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKCF0aHJvd0Vycm9ycykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgdGhyb3cgZXJcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IHZhbGlkID0gKHZlcnNpb24sIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgdiA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiB2ID8gdi52ZXJzaW9uIDogbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5jb25zdCBjbGVhbiA9ICh2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHMgPSBwYXJzZSh2ZXJzaW9uLnRyaW0oKS5yZXBsYWNlKC9eWz12XSsvLCAnJyksIG9wdGlvbnMpXG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSBjbGVhblxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcblxuY29uc3QgaW5jID0gKHZlcnNpb24sIHJlbGVhc2UsIG9wdGlvbnMsIGlkZW50aWZpZXIsIGlkZW50aWZpZXJCYXNlKSA9PiB7XG4gIGlmICh0eXBlb2YgKG9wdGlvbnMpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXJCYXNlID0gaWRlbnRpZmllclxuICAgIGlkZW50aWZpZXIgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZFxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcihcbiAgICAgIHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIgPyB2ZXJzaW9uLnZlcnNpb24gOiB2ZXJzaW9uLFxuICAgICAgb3B0aW9uc1xuICAgICkuaW5jKHJlbGVhc2UsIGlkZW50aWZpZXIsIGlkZW50aWZpZXJCYXNlKS52ZXJzaW9uXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBpbmNcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UuanMnKVxuXG5jb25zdCBkaWZmID0gKHZlcnNpb24xLCB2ZXJzaW9uMikgPT4ge1xuICBjb25zdCB2MSA9IHBhcnNlKHZlcnNpb24xLCBudWxsLCB0cnVlKVxuICBjb25zdCB2MiA9IHBhcnNlKHZlcnNpb24yLCBudWxsLCB0cnVlKVxuICBjb25zdCBjb21wYXJpc29uID0gdjEuY29tcGFyZSh2MilcblxuICBpZiAoY29tcGFyaXNvbiA9PT0gMCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdCB2MUhpZ2hlciA9IGNvbXBhcmlzb24gPiAwXG4gIGNvbnN0IGhpZ2hWZXJzaW9uID0gdjFIaWdoZXIgPyB2MSA6IHYyXG4gIGNvbnN0IGxvd1ZlcnNpb24gPSB2MUhpZ2hlciA/IHYyIDogdjFcbiAgY29uc3QgaGlnaEhhc1ByZSA9ICEhaGlnaFZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGhcbiAgY29uc3QgbG93SGFzUHJlID0gISFsb3dWZXJzaW9uLnByZXJlbGVhc2UubGVuZ3RoXG5cbiAgaWYgKGxvd0hhc1ByZSAmJiAhaGlnaEhhc1ByZSkge1xuICAgIC8vIEdvaW5nIGZyb20gcHJlcmVsZWFzZSAtPiBubyBwcmVyZWxlYXNlIHJlcXVpcmVzIHNvbWUgc3BlY2lhbCBjYXNpbmdcblxuICAgIC8vIElmIHRoZSBsb3cgdmVyc2lvbiBoYXMgb25seSBhIG1ham9yLCB0aGVuIGl0IHdpbGwgYWx3YXlzIGJlIGEgbWFqb3JcbiAgICAvLyBTb21lIGV4YW1wbGVzOlxuICAgIC8vIDEuMC4wLTEgLT4gMS4wLjBcbiAgICAvLyAxLjAuMC0xIC0+IDEuMS4xXG4gICAgLy8gMS4wLjAtMSAtPiAyLjAuMFxuICAgIGlmICghbG93VmVyc2lvbi5wYXRjaCAmJiAhbG93VmVyc2lvbi5taW5vcikge1xuICAgICAgcmV0dXJuICdtYWpvcidcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbWFpbiBwYXJ0IGhhcyBubyBkaWZmZXJlbmNlXG4gICAgaWYgKGxvd1ZlcnNpb24uY29tcGFyZU1haW4oaGlnaFZlcnNpb24pID09PSAwKSB7XG4gICAgICBpZiAobG93VmVyc2lvbi5taW5vciAmJiAhbG93VmVyc2lvbi5wYXRjaCkge1xuICAgICAgICByZXR1cm4gJ21pbm9yJ1xuICAgICAgfVxuICAgICAgcmV0dXJuICdwYXRjaCdcbiAgICB9XG4gIH1cblxuICAvLyBhZGQgdGhlIGBwcmVgIHByZWZpeCBpZiB3ZSBhcmUgZ29pbmcgdG8gYSBwcmVyZWxlYXNlIHZlcnNpb25cbiAgY29uc3QgcHJlZml4ID0gaGlnaEhhc1ByZSA/ICdwcmUnIDogJydcblxuICBpZiAodjEubWFqb3IgIT09IHYyLm1ham9yKSB7XG4gICAgcmV0dXJuIHByZWZpeCArICdtYWpvcidcbiAgfVxuXG4gIGlmICh2MS5taW5vciAhPT0gdjIubWlub3IpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgJ21pbm9yJ1xuICB9XG5cbiAgaWYgKHYxLnBhdGNoICE9PSB2Mi5wYXRjaCkge1xuICAgIHJldHVybiBwcmVmaXggKyAncGF0Y2gnXG4gIH1cblxuICAvLyBoaWdoIGFuZCBsb3cgYXJlIHByZWxlYXNlc1xuICByZXR1cm4gJ3ByZXJlbGVhc2UnXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZlxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IG1ham9yID0gKGEsIGxvb3NlKSA9PiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5tYWpvclxubW9kdWxlLmV4cG9ydHMgPSBtYWpvclxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IG1pbm9yID0gKGEsIGxvb3NlKSA9PiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5taW5vclxubW9kdWxlLmV4cG9ydHMgPSBtaW5vclxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IHBhdGNoID0gKGEsIGxvb3NlKSA9PiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5wYXRjaFxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5jb25zdCBwcmVyZWxlYXNlID0gKHZlcnNpb24sIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2UodmVyc2lvbiwgb3B0aW9ucylcbiAgcmV0dXJuIChwYXJzZWQgJiYgcGFyc2VkLnByZXJlbGVhc2UubGVuZ3RoKSA/IHBhcnNlZC5wcmVyZWxlYXNlIDogbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSBwcmVyZWxlYXNlXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgY29tcGFyZSA9IChhLCBiLCBsb29zZSkgPT5cbiAgbmV3IFNlbVZlcihhLCBsb29zZSkuY29tcGFyZShuZXcgU2VtVmVyKGIsIGxvb3NlKSlcblxubW9kdWxlLmV4cG9ydHMgPSBjb21wYXJlXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCByY29tcGFyZSA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShiLCBhLCBsb29zZSlcbm1vZHVsZS5leHBvcnRzID0gcmNvbXBhcmVcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGNvbXBhcmVMb29zZSA9IChhLCBiKSA9PiBjb21wYXJlKGEsIGIsIHRydWUpXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVMb29zZVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IGNvbXBhcmVCdWlsZCA9IChhLCBiLCBsb29zZSkgPT4ge1xuICBjb25zdCB2ZXJzaW9uQSA9IG5ldyBTZW1WZXIoYSwgbG9vc2UpXG4gIGNvbnN0IHZlcnNpb25CID0gbmV3IFNlbVZlcihiLCBsb29zZSlcbiAgcmV0dXJuIHZlcnNpb25BLmNvbXBhcmUodmVyc2lvbkIpIHx8IHZlcnNpb25BLmNvbXBhcmVCdWlsZCh2ZXJzaW9uQilcbn1cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZUJ1aWxkXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgY29tcGFyZUJ1aWxkID0gcmVxdWlyZSgnLi9jb21wYXJlLWJ1aWxkJylcbmNvbnN0IHNvcnQgPSAobGlzdCwgbG9vc2UpID0+IGxpc3Quc29ydCgoYSwgYikgPT4gY29tcGFyZUJ1aWxkKGEsIGIsIGxvb3NlKSlcbm1vZHVsZS5leHBvcnRzID0gc29ydFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbXBhcmVCdWlsZCA9IHJlcXVpcmUoJy4vY29tcGFyZS1idWlsZCcpXG5jb25zdCByc29ydCA9IChsaXN0LCBsb29zZSkgPT4gbGlzdC5zb3J0KChhLCBiKSA9PiBjb21wYXJlQnVpbGQoYiwgYSwgbG9vc2UpKVxubW9kdWxlLmV4cG9ydHMgPSByc29ydFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgZ3QgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpID4gMFxubW9kdWxlLmV4cG9ydHMgPSBndFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgbHQgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpIDwgMFxubW9kdWxlLmV4cG9ydHMgPSBsdFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgZXEgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpID09PSAwXG5tb2R1bGUuZXhwb3J0cyA9IGVxXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBuZXEgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpICE9PSAwXG5tb2R1bGUuZXhwb3J0cyA9IG5lcVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgZ3RlID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSA+PSAwXG5tb2R1bGUuZXhwb3J0cyA9IGd0ZVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgbHRlID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8PSAwXG5tb2R1bGUuZXhwb3J0cyA9IGx0ZVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGVxID0gcmVxdWlyZSgnLi9lcScpXG5jb25zdCBuZXEgPSByZXF1aXJlKCcuL25lcScpXG5jb25zdCBndCA9IHJlcXVpcmUoJy4vZ3QnKVxuY29uc3QgZ3RlID0gcmVxdWlyZSgnLi9ndGUnKVxuY29uc3QgbHQgPSByZXF1aXJlKCcuL2x0JylcbmNvbnN0IGx0ZSA9IHJlcXVpcmUoJy4vbHRlJylcblxuY29uc3QgY21wID0gKGEsIG9wLCBiLCBsb29zZSkgPT4ge1xuICBzd2l0Y2ggKG9wKSB7XG4gICAgY2FzZSAnPT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYSA9IGEudmVyc2lvblxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICBiID0gYi52ZXJzaW9uXG4gICAgICB9XG4gICAgICByZXR1cm4gYSA9PT0gYlxuXG4gICAgY2FzZSAnIT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYSA9IGEudmVyc2lvblxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICBiID0gYi52ZXJzaW9uXG4gICAgICB9XG4gICAgICByZXR1cm4gYSAhPT0gYlxuXG4gICAgY2FzZSAnJzpcbiAgICBjYXNlICc9JzpcbiAgICBjYXNlICc9PSc6XG4gICAgICByZXR1cm4gZXEoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICchPSc6XG4gICAgICByZXR1cm4gbmVxKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPic6XG4gICAgICByZXR1cm4gZ3QoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc+PSc6XG4gICAgICByZXR1cm4gZ3RlKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPCc6XG4gICAgICByZXR1cm4gbHQoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc8PSc6XG4gICAgICByZXR1cm4gbHRlKGEsIGIsIGxvb3NlKVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgb3BlcmF0b3I6ICR7b3B9YClcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBjbXBcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3QgeyBzYWZlUmU6IHJlLCB0IH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9yZScpXG5cbmNvbnN0IGNvZXJjZSA9ICh2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgcmV0dXJuIHZlcnNpb25cbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ251bWJlcicpIHtcbiAgICB2ZXJzaW9uID0gU3RyaW5nKHZlcnNpb24pXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgbGV0IG1hdGNoID0gbnVsbFxuICBpZiAoIW9wdGlvbnMucnRsKSB7XG4gICAgbWF0Y2ggPSB2ZXJzaW9uLm1hdGNoKG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgPyByZVt0LkNPRVJDRUZVTExdIDogcmVbdC5DT0VSQ0VdKVxuICB9IGVsc2Uge1xuICAgIC8vIEZpbmQgdGhlIHJpZ2h0LW1vc3QgY29lcmNpYmxlIHN0cmluZyB0aGF0IGRvZXMgbm90IHNoYXJlXG4gICAgLy8gYSB0ZXJtaW51cyB3aXRoIGEgbW9yZSBsZWZ0LXdhcmQgY29lcmNpYmxlIHN0cmluZy5cbiAgICAvLyBFZywgJzEuMi4zLjQnIHdhbnRzIHRvIGNvZXJjZSAnMi4zLjQnLCBub3QgJzMuNCcgb3IgJzQnXG4gICAgLy8gV2l0aCBpbmNsdWRlUHJlcmVsZWFzZSBvcHRpb24gc2V0LCAnMS4yLjMuNC1yYycgd2FudHMgdG8gY29lcmNlICcyLjMuNC1yYycsIG5vdCAnMi4zLjQnXG4gICAgLy9cbiAgICAvLyBXYWxrIHRocm91Z2ggdGhlIHN0cmluZyBjaGVja2luZyB3aXRoIGEgL2cgcmVnZXhwXG4gICAgLy8gTWFudWFsbHkgc2V0IHRoZSBpbmRleCBzbyBhcyB0byBwaWNrIHVwIG92ZXJsYXBwaW5nIG1hdGNoZXMuXG4gICAgLy8gU3RvcCB3aGVuIHdlIGdldCBhIG1hdGNoIHRoYXQgZW5kcyBhdCB0aGUgc3RyaW5nIGVuZCwgc2luY2Ugbm9cbiAgICAvLyBjb2VyY2libGUgc3RyaW5nIGNhbiBiZSBtb3JlIHJpZ2h0LXdhcmQgd2l0aG91dCB0aGUgc2FtZSB0ZXJtaW51cy5cbiAgICBjb25zdCBjb2VyY2VSdGxSZWdleCA9IG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgPyByZVt0LkNPRVJDRVJUTEZVTExdIDogcmVbdC5DT0VSQ0VSVExdXG4gICAgbGV0IG5leHRcbiAgICB3aGlsZSAoKG5leHQgPSBjb2VyY2VSdGxSZWdleC5leGVjKHZlcnNpb24pKSAmJlxuICAgICAgICAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoICE9PSB2ZXJzaW9uLmxlbmd0aClcbiAgICApIHtcbiAgICAgIGlmICghbWF0Y2ggfHxcbiAgICAgICAgICAgIG5leHQuaW5kZXggKyBuZXh0WzBdLmxlbmd0aCAhPT0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpIHtcbiAgICAgICAgbWF0Y2ggPSBuZXh0XG4gICAgICB9XG4gICAgICBjb2VyY2VSdGxSZWdleC5sYXN0SW5kZXggPSBuZXh0LmluZGV4ICsgbmV4dFsxXS5sZW5ndGggKyBuZXh0WzJdLmxlbmd0aFxuICAgIH1cbiAgICAvLyBsZWF2ZSBpdCBpbiBhIGNsZWFuIHN0YXRlXG4gICAgY29lcmNlUnRsUmVnZXgubGFzdEluZGV4ID0gLTFcbiAgfVxuXG4gIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdCBtYWpvciA9IG1hdGNoWzJdXG4gIGNvbnN0IG1pbm9yID0gbWF0Y2hbM10gfHwgJzAnXG4gIGNvbnN0IHBhdGNoID0gbWF0Y2hbNF0gfHwgJzAnXG4gIGNvbnN0IHByZXJlbGVhc2UgPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlICYmIG1hdGNoWzVdID8gYC0ke21hdGNoWzVdfWAgOiAnJ1xuICBjb25zdCBidWlsZCA9IG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgJiYgbWF0Y2hbNl0gPyBgKyR7bWF0Y2hbNl19YCA6ICcnXG5cbiAgcmV0dXJuIHBhcnNlKGAke21ham9yfS4ke21pbm9yfS4ke3BhdGNofSR7cHJlcmVsZWFzZX0ke2J1aWxkfWAsIG9wdGlvbnMpXG59XG5tb2R1bGUuZXhwb3J0cyA9IGNvZXJjZVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIExSVUNhY2hlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWF4ID0gMTAwMFxuICAgIHRoaXMubWFwID0gbmV3IE1hcCgpXG4gIH1cblxuICBnZXQgKGtleSkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5tYXAuZ2V0KGtleSlcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGtleSBmcm9tIHRoZSBtYXAgYW5kIGFkZCBpdCB0byB0aGUgZW5kXG4gICAgICB0aGlzLm1hcC5kZWxldGUoa2V5KVxuICAgICAgdGhpcy5tYXAuc2V0KGtleSwgdmFsdWUpXG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gIH1cblxuICBkZWxldGUgKGtleSkge1xuICAgIHJldHVybiB0aGlzLm1hcC5kZWxldGUoa2V5KVxuICB9XG5cbiAgc2V0IChrZXksIHZhbHVlKSB7XG4gICAgY29uc3QgZGVsZXRlZCA9IHRoaXMuZGVsZXRlKGtleSlcblxuICAgIGlmICghZGVsZXRlZCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBJZiBjYWNoZSBpcyBmdWxsLCBkZWxldGUgdGhlIGxlYXN0IHJlY2VudGx5IHVzZWQgaXRlbVxuICAgICAgaWYgKHRoaXMubWFwLnNpemUgPj0gdGhpcy5tYXgpIHtcbiAgICAgICAgY29uc3QgZmlyc3RLZXkgPSB0aGlzLm1hcC5rZXlzKCkubmV4dCgpLnZhbHVlXG4gICAgICAgIHRoaXMuZGVsZXRlKGZpcnN0S2V5KVxuICAgICAgfVxuXG4gICAgICB0aGlzLm1hcC5zZXQoa2V5LCB2YWx1ZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTFJVQ2FjaGVcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTUEFDRV9DSEFSQUNURVJTID0gL1xccysvZ1xuXG4vLyBob2lzdGVkIGNsYXNzIGZvciBjeWNsaWMgZGVwZW5kZW5jeVxuY2xhc3MgUmFuZ2Uge1xuICBjb25zdHJ1Y3RvciAocmFuZ2UsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gcGFyc2VPcHRpb25zKG9wdGlvbnMpXG5cbiAgICBpZiAocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkge1xuICAgICAgaWYgKFxuICAgICAgICByYW5nZS5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlICYmXG4gICAgICAgIHJhbmdlLmluY2x1ZGVQcmVyZWxlYXNlID09PSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2VcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gcmFuZ2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UucmF3LCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyYW5nZSBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICAgIC8vIGp1c3QgcHV0IGl0IGluIHRoZSBzZXQgYW5kIHJldHVyblxuICAgICAgdGhpcy5yYXcgPSByYW5nZS52YWx1ZVxuICAgICAgdGhpcy5zZXQgPSBbW3JhbmdlXV1cbiAgICAgIHRoaXMuZm9ybWF0dGVkID0gdW5kZWZpbmVkXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gICAgdGhpcy5pbmNsdWRlUHJlcmVsZWFzZSA9ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZVxuXG4gICAgLy8gRmlyc3QgcmVkdWNlIGFsbCB3aGl0ZXNwYWNlIGFzIG11Y2ggYXMgcG9zc2libGUgc28gd2UgZG8gbm90IGhhdmUgdG8gcmVseVxuICAgIC8vIG9uIHBvdGVudGlhbGx5IHNsb3cgcmVnZXhlcyBsaWtlIFxccyouIFRoaXMgaXMgdGhlbiBzdG9yZWQgYW5kIHVzZWQgZm9yXG4gICAgLy8gZnV0dXJlIGVycm9yIG1lc3NhZ2VzIGFzIHdlbGwuXG4gICAgdGhpcy5yYXcgPSByYW5nZS50cmltKCkucmVwbGFjZShTUEFDRV9DSEFSQUNURVJTLCAnICcpXG5cbiAgICAvLyBGaXJzdCwgc3BsaXQgb24gfHxcbiAgICB0aGlzLnNldCA9IHRoaXMucmF3XG4gICAgICAuc3BsaXQoJ3x8JylcbiAgICAgIC8vIG1hcCB0aGUgcmFuZ2UgdG8gYSAyZCBhcnJheSBvZiBjb21wYXJhdG9yc1xuICAgICAgLm1hcChyID0+IHRoaXMucGFyc2VSYW5nZShyLnRyaW0oKSkpXG4gICAgICAvLyB0aHJvdyBvdXQgYW55IGNvbXBhcmF0b3IgbGlzdHMgdGhhdCBhcmUgZW1wdHlcbiAgICAgIC8vIHRoaXMgZ2VuZXJhbGx5IG1lYW5zIHRoYXQgaXQgd2FzIG5vdCBhIHZhbGlkIHJhbmdlLCB3aGljaCBpcyBhbGxvd2VkXG4gICAgICAvLyBpbiBsb29zZSBtb2RlLCBidXQgd2lsbCBzdGlsbCB0aHJvdyBpZiB0aGUgV0hPTEUgcmFuZ2UgaXMgaW52YWxpZC5cbiAgICAgIC5maWx0ZXIoYyA9PiBjLmxlbmd0aClcblxuICAgIGlmICghdGhpcy5zZXQubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIFNlbVZlciBSYW5nZTogJHt0aGlzLnJhd31gKVxuICAgIH1cblxuICAgIC8vIGlmIHdlIGhhdmUgYW55IHRoYXQgYXJlIG5vdCB0aGUgbnVsbCBzZXQsIHRocm93IG91dCBudWxsIHNldHMuXG4gICAgaWYgKHRoaXMuc2V0Lmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIGtlZXAgdGhlIGZpcnN0IG9uZSwgaW4gY2FzZSB0aGV5J3JlIGFsbCBudWxsIHNldHNcbiAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5zZXRbMF1cbiAgICAgIHRoaXMuc2V0ID0gdGhpcy5zZXQuZmlsdGVyKGMgPT4gIWlzTnVsbFNldChjWzBdKSlcbiAgICAgIGlmICh0aGlzLnNldC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5zZXQgPSBbZmlyc3RdXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2V0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhbnkgdGhhdCBhcmUgKiwgdGhlbiB0aGUgcmFuZ2UgaXMganVzdCAqXG4gICAgICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLnNldCkge1xuICAgICAgICAgIGlmIChjLmxlbmd0aCA9PT0gMSAmJiBpc0FueShjWzBdKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQgPSBbY11cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtYXR0ZWQgPSB1bmRlZmluZWRcbiAgfVxuXG4gIGdldCByYW5nZSAoKSB7XG4gICAgaWYgKHRoaXMuZm9ybWF0dGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZm9ybWF0dGVkID0gJydcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgdGhpcy5mb3JtYXR0ZWQgKz0gJ3x8J1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbXBzID0gdGhpcy5zZXRbaV1cbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjb21wcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIGlmIChrID4gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZWQgKz0gJyAnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZm9ybWF0dGVkICs9IGNvbXBzW2tdLnRvU3RyaW5nKCkudHJpbSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0dGVkXG4gIH1cblxuICBmb3JtYXQgKCkge1xuICAgIHJldHVybiB0aGlzLnJhbmdlXG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZ2VcbiAgfVxuXG4gIHBhcnNlUmFuZ2UgKHJhbmdlKSB7XG4gICAgLy8gbWVtb2l6ZSByYW5nZSBwYXJzaW5nIGZvciBwZXJmb3JtYW5jZS5cbiAgICAvLyB0aGlzIGlzIGEgdmVyeSBob3QgcGF0aCwgYW5kIGZ1bGx5IGRldGVybWluaXN0aWMuXG4gICAgY29uc3QgbWVtb09wdHMgPVxuICAgICAgKHRoaXMub3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJiBGTEFHX0lOQ0xVREVfUFJFUkVMRUFTRSkgfFxuICAgICAgKHRoaXMub3B0aW9ucy5sb29zZSAmJiBGTEFHX0xPT1NFKVxuICAgIGNvbnN0IG1lbW9LZXkgPSBtZW1vT3B0cyArICc6JyArIHJhbmdlXG4gICAgY29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KG1lbW9LZXkpXG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgcmV0dXJuIGNhY2hlZFxuICAgIH1cblxuICAgIGNvbnN0IGxvb3NlID0gdGhpcy5vcHRpb25zLmxvb3NlXG4gICAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gICAgY29uc3QgaHIgPSBsb29zZSA/IHJlW3QuSFlQSEVOUkFOR0VMT09TRV0gOiByZVt0LkhZUEhFTlJBTkdFXVxuICAgIHJhbmdlID0gcmFuZ2UucmVwbGFjZShociwgaHlwaGVuUmVwbGFjZSh0aGlzLm9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpKVxuICAgIGRlYnVnKCdoeXBoZW4gcmVwbGFjZScsIHJhbmdlKVxuXG4gICAgLy8gYD4gMS4yLjMgPCAxLjIuNWAgPT4gYD4xLjIuMyA8MS4yLjVgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuQ09NUEFSQVRPUlRSSU1dLCBjb21wYXJhdG9yVHJpbVJlcGxhY2UpXG4gICAgZGVidWcoJ2NvbXBhcmF0b3IgdHJpbScsIHJhbmdlKVxuXG4gICAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuVElMREVUUklNXSwgdGlsZGVUcmltUmVwbGFjZSlcbiAgICBkZWJ1ZygndGlsZGUgdHJpbScsIHJhbmdlKVxuXG4gICAgLy8gYF4gMS4yLjNgID0+IGBeMS4yLjNgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuQ0FSRVRUUklNXSwgY2FyZXRUcmltUmVwbGFjZSlcbiAgICBkZWJ1ZygnY2FyZXQgdHJpbScsIHJhbmdlKVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIHJhbmdlIGlzIGNvbXBsZXRlbHkgdHJpbW1lZCBhbmRcbiAgICAvLyByZWFkeSB0byBiZSBzcGxpdCBpbnRvIGNvbXBhcmF0b3JzLlxuXG4gICAgbGV0IHJhbmdlTGlzdCA9IHJhbmdlXG4gICAgICAuc3BsaXQoJyAnKVxuICAgICAgLm1hcChjb21wID0+IHBhcnNlQ29tcGFyYXRvcihjb21wLCB0aGlzLm9wdGlvbnMpKVxuICAgICAgLmpvaW4oJyAnKVxuICAgICAgLnNwbGl0KC9cXHMrLylcbiAgICAgIC8vID49MC4wLjAgaXMgZXF1aXZhbGVudCB0byAqXG4gICAgICAubWFwKGNvbXAgPT4gcmVwbGFjZUdURTAoY29tcCwgdGhpcy5vcHRpb25zKSlcblxuICAgIGlmIChsb29zZSkge1xuICAgICAgLy8gaW4gbG9vc2UgbW9kZSwgdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgdmFsaWQgY29tcGFyYXRvcnNcbiAgICAgIHJhbmdlTGlzdCA9IHJhbmdlTGlzdC5maWx0ZXIoY29tcCA9PiB7XG4gICAgICAgIGRlYnVnKCdsb29zZSBpbnZhbGlkIGZpbHRlcicsIGNvbXAsIHRoaXMub3B0aW9ucylcbiAgICAgICAgcmV0dXJuICEhY29tcC5tYXRjaChyZVt0LkNPTVBBUkFUT1JMT09TRV0pXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWJ1ZygncmFuZ2UgbGlzdCcsIHJhbmdlTGlzdClcblxuICAgIC8vIGlmIGFueSBjb21wYXJhdG9ycyBhcmUgdGhlIG51bGwgc2V0LCB0aGVuIHJlcGxhY2Ugd2l0aCBKVVNUIG51bGwgc2V0XG4gICAgLy8gaWYgbW9yZSB0aGFuIG9uZSBjb21wYXJhdG9yLCByZW1vdmUgYW55ICogY29tcGFyYXRvcnNcbiAgICAvLyBhbHNvLCBkb24ndCBpbmNsdWRlIHRoZSBzYW1lIGNvbXBhcmF0b3IgbW9yZSB0aGFuIG9uY2VcbiAgICBjb25zdCByYW5nZU1hcCA9IG5ldyBNYXAoKVxuICAgIGNvbnN0IGNvbXBhcmF0b3JzID0gcmFuZ2VMaXN0Lm1hcChjb21wID0+IG5ldyBDb21wYXJhdG9yKGNvbXAsIHRoaXMub3B0aW9ucykpXG4gICAgZm9yIChjb25zdCBjb21wIG9mIGNvbXBhcmF0b3JzKSB7XG4gICAgICBpZiAoaXNOdWxsU2V0KGNvbXApKSB7XG4gICAgICAgIHJldHVybiBbY29tcF1cbiAgICAgIH1cbiAgICAgIHJhbmdlTWFwLnNldChjb21wLnZhbHVlLCBjb21wKVxuICAgIH1cbiAgICBpZiAocmFuZ2VNYXAuc2l6ZSA+IDEgJiYgcmFuZ2VNYXAuaGFzKCcnKSkge1xuICAgICAgcmFuZ2VNYXAuZGVsZXRlKCcnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IFsuLi5yYW5nZU1hcC52YWx1ZXMoKV1cbiAgICBjYWNoZS5zZXQobWVtb0tleSwgcmVzdWx0KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGludGVyc2VjdHMgKHJhbmdlLCBvcHRpb25zKSB7XG4gICAgaWYgKCEocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgUmFuZ2UgaXMgcmVxdWlyZWQnKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNldC5zb21lKCh0aGlzQ29tcGFyYXRvcnMpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGlzU2F0aXNmaWFibGUodGhpc0NvbXBhcmF0b3JzLCBvcHRpb25zKSAmJlxuICAgICAgICByYW5nZS5zZXQuc29tZSgocmFuZ2VDb21wYXJhdG9ycykgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpc1NhdGlzZmlhYmxlKHJhbmdlQ29tcGFyYXRvcnMsIG9wdGlvbnMpICYmXG4gICAgICAgICAgICB0aGlzQ29tcGFyYXRvcnMuZXZlcnkoKHRoaXNDb21wYXJhdG9yKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiByYW5nZUNvbXBhcmF0b3JzLmV2ZXJ5KChyYW5nZUNvbXBhcmF0b3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc0NvbXBhcmF0b3IuaW50ZXJzZWN0cyhyYW5nZUNvbXBhcmF0b3IsIG9wdGlvbnMpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9KVxuICB9XG5cbiAgLy8gaWYgQU5ZIG9mIHRoZSBzZXRzIG1hdGNoIEFMTCBvZiBpdHMgY29tcGFyYXRvcnMsIHRoZW4gcGFzc1xuICB0ZXN0ICh2ZXJzaW9uKSB7XG4gICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpXG4gICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGVzdFNldCh0aGlzLnNldFtpXSwgdmVyc2lvbiwgdGhpcy5vcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJhbmdlXG5cbmNvbnN0IExSVSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2xydWNhY2hlJylcbmNvbnN0IGNhY2hlID0gbmV3IExSVSgpXG5cbmNvbnN0IHBhcnNlT3B0aW9ucyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3BhcnNlLW9wdGlvbnMnKVxuY29uc3QgQ29tcGFyYXRvciA9IHJlcXVpcmUoJy4vY29tcGFyYXRvcicpXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2RlYnVnJylcbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4vc2VtdmVyJylcbmNvbnN0IHtcbiAgc2FmZVJlOiByZSxcbiAgdCxcbiAgY29tcGFyYXRvclRyaW1SZXBsYWNlLFxuICB0aWxkZVRyaW1SZXBsYWNlLFxuICBjYXJldFRyaW1SZXBsYWNlLFxufSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3JlJylcbmNvbnN0IHsgRkxBR19JTkNMVURFX1BSRVJFTEVBU0UsIEZMQUdfTE9PU0UgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NvbnN0YW50cycpXG5cbmNvbnN0IGlzTnVsbFNldCA9IGMgPT4gYy52YWx1ZSA9PT0gJzwwLjAuMC0wJ1xuY29uc3QgaXNBbnkgPSBjID0+IGMudmFsdWUgPT09ICcnXG5cbi8vIHRha2UgYSBzZXQgb2YgY29tcGFyYXRvcnMgYW5kIGRldGVybWluZSB3aGV0aGVyIHRoZXJlXG4vLyBleGlzdHMgYSB2ZXJzaW9uIHdoaWNoIGNhbiBzYXRpc2Z5IGl0XG5jb25zdCBpc1NhdGlzZmlhYmxlID0gKGNvbXBhcmF0b3JzLCBvcHRpb25zKSA9PiB7XG4gIGxldCByZXN1bHQgPSB0cnVlXG4gIGNvbnN0IHJlbWFpbmluZ0NvbXBhcmF0b3JzID0gY29tcGFyYXRvcnMuc2xpY2UoKVxuICBsZXQgdGVzdENvbXBhcmF0b3IgPSByZW1haW5pbmdDb21wYXJhdG9ycy5wb3AoKVxuXG4gIHdoaWxlIChyZXN1bHQgJiYgcmVtYWluaW5nQ29tcGFyYXRvcnMubGVuZ3RoKSB7XG4gICAgcmVzdWx0ID0gcmVtYWluaW5nQ29tcGFyYXRvcnMuZXZlcnkoKG90aGVyQ29tcGFyYXRvcikgPT4ge1xuICAgICAgcmV0dXJuIHRlc3RDb21wYXJhdG9yLmludGVyc2VjdHMob3RoZXJDb21wYXJhdG9yLCBvcHRpb25zKVxuICAgIH0pXG5cbiAgICB0ZXN0Q29tcGFyYXRvciA9IHJlbWFpbmluZ0NvbXBhcmF0b3JzLnBvcCgpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8vIGNvbXByaXNlZCBvZiB4cmFuZ2VzLCB0aWxkZXMsIHN0YXJzLCBhbmQgZ3RsdCdzIGF0IHRoaXMgcG9pbnQuXG4vLyBhbHJlYWR5IHJlcGxhY2VkIHRoZSBoeXBoZW4gcmFuZ2VzXG4vLyB0dXJuIGludG8gYSBzZXQgb2YgSlVTVCBjb21wYXJhdG9ycy5cbmNvbnN0IHBhcnNlQ29tcGFyYXRvciA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdjb21wJywgY29tcCwgb3B0aW9ucylcbiAgY29tcCA9IHJlcGxhY2VDYXJldHMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ2NhcmV0JywgY29tcClcbiAgY29tcCA9IHJlcGxhY2VUaWxkZXMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3RpbGRlcycsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlWFJhbmdlcyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygneHJhbmdlJywgY29tcClcbiAgY29tcCA9IHJlcGxhY2VTdGFycyhjb21wLCBvcHRpb25zKVxuICBkZWJ1Zygnc3RhcnMnLCBjb21wKVxuICByZXR1cm4gY29tcFxufVxuXG5jb25zdCBpc1ggPSBpZCA9PiAhaWQgfHwgaWQudG9Mb3dlckNhc2UoKSA9PT0gJ3gnIHx8IGlkID09PSAnKidcblxuLy8gfiwgfj4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyB+MiwgfjIueCwgfjIueC54LCB+PjIsIH4+Mi54IH4+Mi54LnggLS0+ID49Mi4wLjAgPDMuMC4wLTBcbi8vIH4yLjAsIH4yLjAueCwgfj4yLjAsIH4+Mi4wLnggLS0+ID49Mi4wLjAgPDIuMS4wLTBcbi8vIH4xLjIsIH4xLjIueCwgfj4xLjIsIH4+MS4yLnggLS0+ID49MS4yLjAgPDEuMy4wLTBcbi8vIH4xLjIuMywgfj4xLjIuMyAtLT4gPj0xLjIuMyA8MS4zLjAtMFxuLy8gfjEuMi4wLCB+PjEuMi4wIC0tPiA+PTEuMi4wIDwxLjMuMC0wXG4vLyB+MC4wLjEgLS0+ID49MC4wLjEgPDAuMS4wLTBcbmNvbnN0IHJlcGxhY2VUaWxkZXMgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICByZXR1cm4gY29tcFxuICAgIC50cmltKClcbiAgICAuc3BsaXQoL1xccysvKVxuICAgIC5tYXAoKGMpID0+IHJlcGxhY2VUaWxkZShjLCBvcHRpb25zKSlcbiAgICAuam9pbignICcpXG59XG5cbmNvbnN0IHJlcGxhY2VUaWxkZSA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5USUxERUxPT1NFXSA6IHJlW3QuVElMREVdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgKF8sIE0sIG0sIHAsIHByKSA9PiB7XG4gICAgZGVidWcoJ3RpbGRlJywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgbGV0IHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gYD49JHtNfS4wLjAgPCR7K00gKyAxfS4wLjAtMGBcbiAgICB9IGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgLy8gfjEuMiA9PSA+PTEuMi4wIDwxLjMuMC0wXG4gICAgICByZXQgPSBgPj0ke019LiR7bX0uMCA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgIH0gZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlVGlsZGUgcHInLCBwcilcbiAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3B9LSR7cHJcbiAgICAgIH0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gfjEuMi4zID09ID49MS4yLjMgPDEuMy4wLTBcbiAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3BcbiAgICAgIH0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICB9XG5cbiAgICBkZWJ1ZygndGlsZGUgcmV0dXJuJywgcmV0KVxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuLy8gXiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIF4yLCBeMi54LCBeMi54LnggLS0+ID49Mi4wLjAgPDMuMC4wLTBcbi8vIF4yLjAsIF4yLjAueCAtLT4gPj0yLjAuMCA8My4wLjAtMFxuLy8gXjEuMiwgXjEuMi54IC0tPiA+PTEuMi4wIDwyLjAuMC0wXG4vLyBeMS4yLjMgLS0+ID49MS4yLjMgPDIuMC4wLTBcbi8vIF4xLjIuMCAtLT4gPj0xLjIuMCA8Mi4wLjAtMFxuLy8gXjAuMC4xIC0tPiA+PTAuMC4xIDwwLjAuMi0wXG4vLyBeMC4xLjAgLS0+ID49MC4xLjAgPDAuMi4wLTBcbmNvbnN0IHJlcGxhY2VDYXJldHMgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICByZXR1cm4gY29tcFxuICAgIC50cmltKClcbiAgICAuc3BsaXQoL1xccysvKVxuICAgIC5tYXAoKGMpID0+IHJlcGxhY2VDYXJldChjLCBvcHRpb25zKSlcbiAgICAuam9pbignICcpXG59XG5cbmNvbnN0IHJlcGxhY2VDYXJldCA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXAsIG9wdGlvbnMpXG4gIGNvbnN0IHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5DQVJFVExPT1NFXSA6IHJlW3QuQ0FSRVRdXG4gIGNvbnN0IHogPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gJy0wJyA6ICcnXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgKF8sIE0sIG0sIHAsIHByKSA9PiB7XG4gICAgZGVidWcoJ2NhcmV0JywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgbGV0IHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gYD49JHtNfS4wLjAke3p9IDwkeytNICsgMX0uMC4wLTBgXG4gICAgfSBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LjAke3p9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uMCR7en0gPCR7K00gKyAxfS4wLjAtMGBcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZUNhcmV0IHByJywgcHIpXG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpIHtcbiAgICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwfS0ke3ByXG4gICAgICAgICAgfSA8JHtNfS4ke219LiR7K3AgKyAxfS0wYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3B9LSR7cHJcbiAgICAgICAgICB9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3B9LSR7cHJcbiAgICAgICAgfSA8JHsrTSArIDF9LjAuMC0wYFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Zygnbm8gcHInKVxuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKSB7XG4gICAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cFxuICAgICAgICAgIH0ke3p9IDwke019LiR7bX0uJHsrcCArIDF9LTBgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cFxuICAgICAgICAgIH0ke3p9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3BcbiAgICAgICAgfSA8JHsrTSArIDF9LjAuMC0wYFxuICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnKCdjYXJldCByZXR1cm4nLCByZXQpXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG5jb25zdCByZXBsYWNlWFJhbmdlcyA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdyZXBsYWNlWFJhbmdlcycsIGNvbXAsIG9wdGlvbnMpXG4gIHJldHVybiBjb21wXG4gICAgLnNwbGl0KC9cXHMrLylcbiAgICAubWFwKChjKSA9PiByZXBsYWNlWFJhbmdlKGMsIG9wdGlvbnMpKVxuICAgIC5qb2luKCcgJylcbn1cblxuY29uc3QgcmVwbGFjZVhSYW5nZSA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGNvbXAgPSBjb21wLnRyaW0oKVxuICBjb25zdCByID0gb3B0aW9ucy5sb29zZSA/IHJlW3QuWFJBTkdFTE9PU0VdIDogcmVbdC5YUkFOR0VdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgKHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpID0+IHtcbiAgICBkZWJ1ZygneFJhbmdlJywgY29tcCwgcmV0LCBndGx0LCBNLCBtLCBwLCBwcilcbiAgICBjb25zdCB4TSA9IGlzWChNKVxuICAgIGNvbnN0IHhtID0geE0gfHwgaXNYKG0pXG4gICAgY29uc3QgeHAgPSB4bSB8fCBpc1gocClcbiAgICBjb25zdCBhbnlYID0geHBcblxuICAgIGlmIChndGx0ID09PSAnPScgJiYgYW55WCkge1xuICAgICAgZ3RsdCA9ICcnXG4gICAgfVxuXG4gICAgLy8gaWYgd2UncmUgaW5jbHVkaW5nIHByZXJlbGVhc2VzIGluIHRoZSBtYXRjaCwgdGhlbiB3ZSBuZWVkXG4gICAgLy8gdG8gZml4IHRoaXMgdG8gLTAsIHRoZSBsb3dlc3QgcG9zc2libGUgcHJlcmVsZWFzZSB2YWx1ZVxuICAgIHByID0gb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSA/ICctMCcgOiAnJ1xuXG4gICAgaWYgKHhNKSB7XG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nIHx8IGd0bHQgPT09ICc8Jykge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGFsbG93ZWRcbiAgICAgICAgcmV0ID0gJzwwLjAuMC0wJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBmb3JiaWRkZW5cbiAgICAgICAgcmV0ID0gJyonXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChndGx0ICYmIGFueVgpIHtcbiAgICAgIC8vIHdlIGtub3cgcGF0Y2ggaXMgYW4geCwgYmVjYXVzZSB3ZSBoYXZlIGFueSB4IGF0IGFsbC5cbiAgICAgIC8vIHJlcGxhY2UgWCB3aXRoIDBcbiAgICAgIGlmICh4bSkge1xuICAgICAgICBtID0gMFxuICAgICAgfVxuICAgICAgcCA9IDBcblxuICAgICAgaWYgKGd0bHQgPT09ICc+Jykge1xuICAgICAgICAvLyA+MSA9PiA+PTIuMC4wXG4gICAgICAgIC8vID4xLjIgPT4gPj0xLjMuMFxuICAgICAgICBndGx0ID0gJz49J1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxXG4gICAgICAgICAgbSA9IDBcbiAgICAgICAgICBwID0gMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG0gPSArbSArIDFcbiAgICAgICAgICBwID0gMFxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGd0bHQgPT09ICc8PScpIHtcbiAgICAgICAgLy8gPD0wLjcueCBpcyBhY3R1YWxseSA8MC44LjAsIHNpbmNlIGFueSAwLjcueCBzaG91bGRcbiAgICAgICAgLy8gcGFzcy4gIFNpbWlsYXJseSwgPD03LnggaXMgYWN0dWFsbHkgPDguMC4wLCBldGMuXG4gICAgICAgIGd0bHQgPSAnPCdcbiAgICAgICAgaWYgKHhtKSB7XG4gICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG0gPSArbSArIDFcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZ3RsdCA9PT0gJzwnKSB7XG4gICAgICAgIHByID0gJy0wJ1xuICAgICAgfVxuXG4gICAgICByZXQgPSBgJHtndGx0ICsgTX0uJHttfS4ke3B9JHtwcn1gXG4gICAgfSBlbHNlIGlmICh4bSkge1xuICAgICAgcmV0ID0gYD49JHtNfS4wLjAke3ByfSA8JHsrTSArIDF9LjAuMC0wYFxuICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4wJHtwclxuICAgICAgfSA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgIH1cblxuICAgIGRlYnVnKCd4UmFuZ2UgcmV0dXJuJywgcmV0KVxuXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG4vLyBCZWNhdXNlICogaXMgQU5ELWVkIHdpdGggZXZlcnl0aGluZyBlbHNlIGluIHRoZSBjb21wYXJhdG9yLFxuLy8gYW5kICcnIG1lYW5zIFwiYW55IHZlcnNpb25cIiwganVzdCByZW1vdmUgdGhlICpzIGVudGlyZWx5LlxuY29uc3QgcmVwbGFjZVN0YXJzID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgZGVidWcoJ3JlcGxhY2VTdGFycycsIGNvbXAsIG9wdGlvbnMpXG4gIC8vIExvb3NlbmVzcyBpcyBpZ25vcmVkIGhlcmUuICBzdGFyIGlzIGFsd2F5cyBhcyBsb29zZSBhcyBpdCBnZXRzIVxuICByZXR1cm4gY29tcFxuICAgIC50cmltKClcbiAgICAucmVwbGFjZShyZVt0LlNUQVJdLCAnJylcbn1cblxuY29uc3QgcmVwbGFjZUdURTAgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBkZWJ1ZygncmVwbGFjZUdURTAnLCBjb21wLCBvcHRpb25zKVxuICByZXR1cm4gY29tcFxuICAgIC50cmltKClcbiAgICAucmVwbGFjZShyZVtvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gdC5HVEUwUFJFIDogdC5HVEUwXSwgJycpXG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIHN0cmluZy5yZXBsYWNlKHJlW3QuSFlQSEVOUkFOR0VdKVxuLy8gTSwgbSwgcGF0Y2gsIHByZXJlbGVhc2UsIGJ1aWxkXG4vLyAxLjIgLSAzLjQuNSA9PiA+PTEuMi4wIDw9My40LjVcbi8vIDEuMi4zIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wLTAgQW55IDMuNC54IHdpbGwgZG9cbi8vIDEuMiAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMC0wXG4vLyBUT0RPIGJ1aWxkP1xuY29uc3QgaHlwaGVuUmVwbGFjZSA9IGluY1ByID0+ICgkMCxcbiAgZnJvbSwgZk0sIGZtLCBmcCwgZnByLCBmYixcbiAgdG8sIHRNLCB0bSwgdHAsIHRwcikgPT4ge1xuICBpZiAoaXNYKGZNKSkge1xuICAgIGZyb20gPSAnJ1xuICB9IGVsc2UgaWYgKGlzWChmbSkpIHtcbiAgICBmcm9tID0gYD49JHtmTX0uMC4wJHtpbmNQciA/ICctMCcgOiAnJ31gXG4gIH0gZWxzZSBpZiAoaXNYKGZwKSkge1xuICAgIGZyb20gPSBgPj0ke2ZNfS4ke2ZtfS4wJHtpbmNQciA/ICctMCcgOiAnJ31gXG4gIH0gZWxzZSBpZiAoZnByKSB7XG4gICAgZnJvbSA9IGA+PSR7ZnJvbX1gXG4gIH0gZWxzZSB7XG4gICAgZnJvbSA9IGA+PSR7ZnJvbX0ke2luY1ByID8gJy0wJyA6ICcnfWBcbiAgfVxuXG4gIGlmIChpc1godE0pKSB7XG4gICAgdG8gPSAnJ1xuICB9IGVsc2UgaWYgKGlzWCh0bSkpIHtcbiAgICB0byA9IGA8JHsrdE0gKyAxfS4wLjAtMGBcbiAgfSBlbHNlIGlmIChpc1godHApKSB7XG4gICAgdG8gPSBgPCR7dE19LiR7K3RtICsgMX0uMC0wYFxuICB9IGVsc2UgaWYgKHRwcikge1xuICAgIHRvID0gYDw9JHt0TX0uJHt0bX0uJHt0cH0tJHt0cHJ9YFxuICB9IGVsc2UgaWYgKGluY1ByKSB7XG4gICAgdG8gPSBgPCR7dE19LiR7dG19LiR7K3RwICsgMX0tMGBcbiAgfSBlbHNlIHtcbiAgICB0byA9IGA8PSR7dG99YFxuICB9XG5cbiAgcmV0dXJuIGAke2Zyb219ICR7dG99YC50cmltKClcbn1cblxuY29uc3QgdGVzdFNldCA9IChzZXQsIHZlcnNpb24sIG9wdGlvbnMpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIXNldFtpXS50ZXN0KHZlcnNpb24pKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZiAodmVyc2lvbi5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgIC8vIEZpbmQgdGhlIHNldCBvZiB2ZXJzaW9ucyB0aGF0IGFyZSBhbGxvd2VkIHRvIGhhdmUgcHJlcmVsZWFzZXNcbiAgICAvLyBGb3IgZXhhbXBsZSwgXjEuMi4zLXByLjEgZGVzdWdhcnMgdG8gPj0xLjIuMy1wci4xIDwyLjAuMFxuICAgIC8vIFRoYXQgc2hvdWxkIGFsbG93IGAxLjIuMy1wci4yYCB0byBwYXNzLlxuICAgIC8vIEhvd2V2ZXIsIGAxLjIuNC1hbHBoYS5ub3RyZWFkeWAgc2hvdWxkIE5PVCBiZSBhbGxvd2VkLFxuICAgIC8vIGV2ZW4gdGhvdWdoIGl0J3Mgd2l0aGluIHRoZSByYW5nZSBzZXQgYnkgdGhlIGNvbXBhcmF0b3JzLlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWJ1ZyhzZXRbaV0uc2VtdmVyKVxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIgPT09IENvbXBhcmF0b3IuQU5ZKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBhbGxvd2VkID0gc2V0W2ldLnNlbXZlclxuICAgICAgICBpZiAoYWxsb3dlZC5tYWpvciA9PT0gdmVyc2lvbi5tYWpvciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5taW5vciA9PT0gdmVyc2lvbi5taW5vciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5wYXRjaCA9PT0gdmVyc2lvbi5wYXRjaCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBWZXJzaW9uIGhhcyBhIC1wcmUsIGJ1dCBpdCdzIG5vdCBvbmUgb2YgdGhlIG9uZXMgd2UgbGlrZS5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgQU5ZID0gU3ltYm9sKCdTZW1WZXIgQU5ZJylcbi8vIGhvaXN0ZWQgY2xhc3MgZm9yIGN5Y2xpYyBkZXBlbmRlbmN5XG5jbGFzcyBDb21wYXJhdG9yIHtcbiAgc3RhdGljIGdldCBBTlkgKCkge1xuICAgIHJldHVybiBBTllcbiAgfVxuXG4gIGNvbnN0cnVjdG9yIChjb21wLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHBhcnNlT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgaWYgKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSB7XG4gICAgICBpZiAoY29tcC5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlKSB7XG4gICAgICAgIHJldHVybiBjb21wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wID0gY29tcC52YWx1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXAgPSBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLmpvaW4oJyAnKVxuICAgIGRlYnVnKCdjb21wYXJhdG9yJywgY29tcCwgb3B0aW9ucylcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuICAgIHRoaXMucGFyc2UoY29tcClcblxuICAgIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICB0aGlzLnZhbHVlID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMub3BlcmF0b3IgKyB0aGlzLnNlbXZlci52ZXJzaW9uXG4gICAgfVxuXG4gICAgZGVidWcoJ2NvbXAnLCB0aGlzKVxuICB9XG5cbiAgcGFyc2UgKGNvbXApIHtcbiAgICBjb25zdCByID0gdGhpcy5vcHRpb25zLmxvb3NlID8gcmVbdC5DT01QQVJBVE9STE9PU0VdIDogcmVbdC5DT01QQVJBVE9SXVxuICAgIGNvbnN0IG0gPSBjb21wLm1hdGNoKHIpXG5cbiAgICBpZiAoIW0pIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgY29tcGFyYXRvcjogJHtjb21wfWApXG4gICAgfVxuXG4gICAgdGhpcy5vcGVyYXRvciA9IG1bMV0gIT09IHVuZGVmaW5lZCA/IG1bMV0gOiAnJ1xuICAgIGlmICh0aGlzLm9wZXJhdG9yID09PSAnPScpIHtcbiAgICAgIHRoaXMub3BlcmF0b3IgPSAnJ1xuICAgIH1cblxuICAgIC8vIGlmIGl0IGxpdGVyYWxseSBpcyBqdXN0ICc+JyBvciAnJyB0aGVuIGFsbG93IGFueXRoaW5nLlxuICAgIGlmICghbVsyXSkge1xuICAgICAgdGhpcy5zZW12ZXIgPSBBTllcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW12ZXIgPSBuZXcgU2VtVmVyKG1bMl0sIHRoaXMub3B0aW9ucy5sb29zZSlcbiAgICB9XG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgfVxuXG4gIHRlc3QgKHZlcnNpb24pIHtcbiAgICBkZWJ1ZygnQ29tcGFyYXRvci50ZXN0JywgdmVyc2lvbiwgdGhpcy5vcHRpb25zLmxvb3NlKVxuXG4gICAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkgfHwgdmVyc2lvbiA9PT0gQU5ZKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMub3B0aW9ucylcbiAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbXAodmVyc2lvbiwgdGhpcy5vcGVyYXRvciwgdGhpcy5zZW12ZXIsIHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIGludGVyc2VjdHMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgICBpZiAoIShjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgQ29tcGFyYXRvciBpcyByZXF1aXJlZCcpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICcnKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUmFuZ2UoY29tcC52YWx1ZSwgb3B0aW9ucykudGVzdCh0aGlzLnZhbHVlKVxuICAgIH0gZWxzZSBpZiAoY29tcC5vcGVyYXRvciA9PT0gJycpIHtcbiAgICAgIGlmIChjb21wLnZhbHVlID09PSAnJykge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBSYW5nZSh0aGlzLnZhbHVlLCBvcHRpb25zKS50ZXN0KGNvbXAuc2VtdmVyKVxuICAgIH1cblxuICAgIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMob3B0aW9ucylcblxuICAgIC8vIFNwZWNpYWwgY2FzZXMgd2hlcmUgbm90aGluZyBjYW4gcG9zc2libHkgYmUgbG93ZXJcbiAgICBpZiAob3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJlxuICAgICAgKHRoaXMudmFsdWUgPT09ICc8MC4wLjAtMCcgfHwgY29tcC52YWx1ZSA9PT0gJzwwLjAuMC0wJykpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgJiZcbiAgICAgICh0aGlzLnZhbHVlLnN0YXJ0c1dpdGgoJzwwLjAuMCcpIHx8IGNvbXAudmFsdWUuc3RhcnRzV2l0aCgnPDAuMC4wJykpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBTYW1lIGRpcmVjdGlvbiBpbmNyZWFzaW5nICg+IG9yID49KVxuICAgIGlmICh0aGlzLm9wZXJhdG9yLnN0YXJ0c1dpdGgoJz4nKSAmJiBjb21wLm9wZXJhdG9yLnN0YXJ0c1dpdGgoJz4nKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLy8gU2FtZSBkaXJlY3Rpb24gZGVjcmVhc2luZyAoPCBvciA8PSlcbiAgICBpZiAodGhpcy5vcGVyYXRvci5zdGFydHNXaXRoKCc8JykgJiYgY29tcC5vcGVyYXRvci5zdGFydHNXaXRoKCc8JykpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIC8vIHNhbWUgU2VtVmVyIGFuZCBib3RoIHNpZGVzIGFyZSBpbmNsdXNpdmUgKDw9IG9yID49KVxuICAgIGlmIChcbiAgICAgICh0aGlzLnNlbXZlci52ZXJzaW9uID09PSBjb21wLnNlbXZlci52ZXJzaW9uKSAmJlxuICAgICAgdGhpcy5vcGVyYXRvci5pbmNsdWRlcygnPScpICYmIGNvbXAub3BlcmF0b3IuaW5jbHVkZXMoJz0nKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLy8gb3Bwb3NpdGUgZGlyZWN0aW9ucyBsZXNzIHRoYW5cbiAgICBpZiAoY21wKHRoaXMuc2VtdmVyLCAnPCcsIGNvbXAuc2VtdmVyLCBvcHRpb25zKSAmJlxuICAgICAgdGhpcy5vcGVyYXRvci5zdGFydHNXaXRoKCc+JykgJiYgY29tcC5vcGVyYXRvci5zdGFydHNXaXRoKCc8JykpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIC8vIG9wcG9zaXRlIGRpcmVjdGlvbnMgZ3JlYXRlciB0aGFuXG4gICAgaWYgKGNtcCh0aGlzLnNlbXZlciwgJz4nLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAgIHRoaXMub3BlcmF0b3Iuc3RhcnRzV2l0aCgnPCcpICYmIGNvbXAub3BlcmF0b3Iuc3RhcnRzV2l0aCgnPicpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBhcmF0b3JcblxuY29uc3QgcGFyc2VPcHRpb25zID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGFyc2Utb3B0aW9ucycpXG5jb25zdCB7IHNhZmVSZTogcmUsIHQgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3JlJylcbmNvbnN0IGNtcCA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9jbXAnKVxuY29uc3QgZGVidWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9kZWJ1ZycpXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuL3NlbXZlcicpXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2UnKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCBzYXRpc2ZpZXMgPSAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgdHJ5IHtcbiAgICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gcmFuZ2UudGVzdCh2ZXJzaW9uKVxufVxubW9kdWxlLmV4cG9ydHMgPSBzYXRpc2ZpZXNcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuXG4vLyBNb3N0bHkganVzdCBmb3IgdGVzdGluZyBhbmQgbGVnYWN5IEFQSSByZWFzb25zXG5jb25zdCB0b0NvbXBhcmF0b3JzID0gKHJhbmdlLCBvcHRpb25zKSA9PlxuICBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpLnNldFxuICAgIC5tYXAoY29tcCA9PiBjb21wLm1hcChjID0+IGMudmFsdWUpLmpvaW4oJyAnKS50cmltKCkuc3BsaXQoJyAnKSlcblxubW9kdWxlLmV4cG9ydHMgPSB0b0NvbXBhcmF0b3JzXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcblxuY29uc3QgbWF4U2F0aXNmeWluZyA9ICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgbGV0IG1heCA9IG51bGxcbiAgbGV0IG1heFNWID0gbnVsbFxuICBsZXQgcmFuZ2VPYmogPSBudWxsXG4gIHRyeSB7XG4gICAgcmFuZ2VPYmogPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2ZXJzaW9ucy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgaWYgKHJhbmdlT2JqLnRlc3QodikpIHtcbiAgICAgIC8vIHNhdGlzZmllcyh2LCByYW5nZSwgb3B0aW9ucylcbiAgICAgIGlmICghbWF4IHx8IG1heFNWLmNvbXBhcmUodikgPT09IC0xKSB7XG4gICAgICAgIC8vIGNvbXBhcmUobWF4LCB2LCB0cnVlKVxuICAgICAgICBtYXggPSB2XG4gICAgICAgIG1heFNWID0gbmV3IFNlbVZlcihtYXgsIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuICB9KVxuICByZXR1cm4gbWF4XG59XG5tb2R1bGUuZXhwb3J0cyA9IG1heFNhdGlzZnlpbmdcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgbWluU2F0aXNmeWluZyA9ICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgbGV0IG1pbiA9IG51bGxcbiAgbGV0IG1pblNWID0gbnVsbFxuICBsZXQgcmFuZ2VPYmogPSBudWxsXG4gIHRyeSB7XG4gICAgcmFuZ2VPYmogPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2ZXJzaW9ucy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgaWYgKHJhbmdlT2JqLnRlc3QodikpIHtcbiAgICAgIC8vIHNhdGlzZmllcyh2LCByYW5nZSwgb3B0aW9ucylcbiAgICAgIGlmICghbWluIHx8IG1pblNWLmNvbXBhcmUodikgPT09IDEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtaW4sIHYsIHRydWUpXG4gICAgICAgIG1pbiA9IHZcbiAgICAgICAgbWluU1YgPSBuZXcgU2VtVmVyKG1pbiwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtaW5cbn1cbm1vZHVsZS5leHBvcnRzID0gbWluU2F0aXNmeWluZ1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCBndCA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9ndCcpXG5cbmNvbnN0IG1pblZlcnNpb24gPSAocmFuZ2UsIGxvb3NlKSA9PiB7XG4gIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSlcblxuICBsZXQgbWludmVyID0gbmV3IFNlbVZlcignMC4wLjAnKVxuICBpZiAocmFuZ2UudGVzdChtaW52ZXIpKSB7XG4gICAgcmV0dXJuIG1pbnZlclxuICB9XG5cbiAgbWludmVyID0gbmV3IFNlbVZlcignMC4wLjAtMCcpXG4gIGlmIChyYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICBtaW52ZXIgPSBudWxsXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2Uuc2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgY29tcGFyYXRvcnMgPSByYW5nZS5zZXRbaV1cblxuICAgIGxldCBzZXRNaW4gPSBudWxsXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaCgoY29tcGFyYXRvcikgPT4ge1xuICAgICAgLy8gQ2xvbmUgdG8gYXZvaWQgbWFuaXB1bGF0aW5nIHRoZSBjb21wYXJhdG9yJ3Mgc2VtdmVyIG9iamVjdC5cbiAgICAgIGNvbnN0IGNvbXB2ZXIgPSBuZXcgU2VtVmVyKGNvbXBhcmF0b3Iuc2VtdmVyLnZlcnNpb24pXG4gICAgICBzd2l0Y2ggKGNvbXBhcmF0b3Iub3BlcmF0b3IpIHtcbiAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgaWYgKGNvbXB2ZXIucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbXB2ZXIucGF0Y2grK1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wdmVyLnByZXJlbGVhc2UucHVzaCgwKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb21wdmVyLnJhdyA9IGNvbXB2ZXIuZm9ybWF0KClcbiAgICAgICAgICAvKiBmYWxsdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICcnOlxuICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgaWYgKCFzZXRNaW4gfHwgZ3QoY29tcHZlciwgc2V0TWluKSkge1xuICAgICAgICAgICAgc2V0TWluID0gY29tcHZlclxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgIC8qIElnbm9yZSBtYXhpbXVtIHZlcnNpb25zICovXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgb3BlcmF0aW9uOiAke2NvbXBhcmF0b3Iub3BlcmF0b3J9YClcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChzZXRNaW4gJiYgKCFtaW52ZXIgfHwgZ3QobWludmVyLCBzZXRNaW4pKSkge1xuICAgICAgbWludmVyID0gc2V0TWluXG4gICAgfVxuICB9XG5cbiAgaWYgKG1pbnZlciAmJiByYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSBtaW5WZXJzaW9uXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IHZhbGlkUmFuZ2UgPSAocmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBSZXR1cm4gJyonIGluc3RlYWQgb2YgJycgc28gdGhhdCB0cnV0aGluZXNzIHdvcmtzLlxuICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBpZiBpdCdzIGludmFsaWQgYW55d2F5XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucykucmFuZ2UgfHwgJyonXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZFJhbmdlXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgQ29tcGFyYXRvciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvY29tcGFyYXRvcicpXG5jb25zdCB7IEFOWSB9ID0gQ29tcGFyYXRvclxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IHNhdGlzZmllcyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9zYXRpc2ZpZXMnKVxuY29uc3QgZ3QgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvZ3QnKVxuY29uc3QgbHQgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvbHQnKVxuY29uc3QgbHRlID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2x0ZScpXG5jb25zdCBndGUgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvZ3RlJylcblxuY29uc3Qgb3V0c2lkZSA9ICh2ZXJzaW9uLCByYW5nZSwgaGlsbywgb3B0aW9ucykgPT4ge1xuICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcblxuICBsZXQgZ3RmbiwgbHRlZm4sIGx0Zm4sIGNvbXAsIGVjb21wXG4gIHN3aXRjaCAoaGlsbykge1xuICAgIGNhc2UgJz4nOlxuICAgICAgZ3RmbiA9IGd0XG4gICAgICBsdGVmbiA9IGx0ZVxuICAgICAgbHRmbiA9IGx0XG4gICAgICBjb21wID0gJz4nXG4gICAgICBlY29tcCA9ICc+PSdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnPCc6XG4gICAgICBndGZuID0gbHRcbiAgICAgIGx0ZWZuID0gZ3RlXG4gICAgICBsdGZuID0gZ3RcbiAgICAgIGNvbXAgPSAnPCdcbiAgICAgIGVjb21wID0gJzw9J1xuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwcm92aWRlIGEgaGlsbyB2YWwgb2YgXCI8XCIgb3IgXCI+XCInKVxuICB9XG5cbiAgLy8gSWYgaXQgc2F0aXNmaWVzIHRoZSByYW5nZSBpdCBpcyBub3Qgb3V0c2lkZVxuICBpZiAoc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldXG5cbiAgICBsZXQgaGlnaCA9IG51bGxcbiAgICBsZXQgbG93ID0gbnVsbFxuXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaCgoY29tcGFyYXRvcikgPT4ge1xuICAgICAgaWYgKGNvbXBhcmF0b3Iuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgICAgY29tcGFyYXRvciA9IG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wJylcbiAgICAgIH1cbiAgICAgIGhpZ2ggPSBoaWdoIHx8IGNvbXBhcmF0b3JcbiAgICAgIGxvdyA9IGxvdyB8fCBjb21wYXJhdG9yXG4gICAgICBpZiAoZ3Rmbihjb21wYXJhdG9yLnNlbXZlciwgaGlnaC5zZW12ZXIsIG9wdGlvbnMpKSB7XG4gICAgICAgIGhpZ2ggPSBjb21wYXJhdG9yXG4gICAgICB9IGVsc2UgaWYgKGx0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGxvdy5zZW12ZXIsIG9wdGlvbnMpKSB7XG4gICAgICAgIGxvdyA9IGNvbXBhcmF0b3JcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gSWYgdGhlIGVkZ2UgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhIG9wZXJhdG9yIHRoZW4gb3VyIHZlcnNpb25cbiAgICAvLyBpc24ndCBvdXRzaWRlIGl0XG4gICAgaWYgKGhpZ2gub3BlcmF0b3IgPT09IGNvbXAgfHwgaGlnaC5vcGVyYXRvciA9PT0gZWNvbXApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBsb3dlc3QgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhbiBvcGVyYXRvciBhbmQgb3VyIHZlcnNpb25cbiAgICAvLyBpcyBsZXNzIHRoYW4gaXQgdGhlbiBpdCBpc24ndCBoaWdoZXIgdGhhbiB0aGUgcmFuZ2VcbiAgICBpZiAoKCFsb3cub3BlcmF0b3IgfHwgbG93Lm9wZXJhdG9yID09PSBjb21wKSAmJlxuICAgICAgICBsdGVmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIGlmIChsb3cub3BlcmF0b3IgPT09IGVjb21wICYmIGx0Zm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG91dHNpZGVcbiIsIid1c2Ugc3RyaWN0J1xuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBncmVhdGVyIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2UuXG5jb25zdCBvdXRzaWRlID0gcmVxdWlyZSgnLi9vdXRzaWRlJylcbmNvbnN0IGd0ciA9ICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykgPT4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJz4nLCBvcHRpb25zKVxubW9kdWxlLmV4cG9ydHMgPSBndHJcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBvdXRzaWRlID0gcmVxdWlyZSgnLi9vdXRzaWRlJylcbi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGxlc3MgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZVxuY29uc3QgbHRyID0gKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSA9PiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCAnPCcsIG9wdGlvbnMpXG5tb2R1bGUuZXhwb3J0cyA9IGx0clxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCBpbnRlcnNlY3RzID0gKHIxLCByMiwgb3B0aW9ucykgPT4ge1xuICByMSA9IG5ldyBSYW5nZShyMSwgb3B0aW9ucylcbiAgcjIgPSBuZXcgUmFuZ2UocjIsIG9wdGlvbnMpXG4gIHJldHVybiByMS5pbnRlcnNlY3RzKHIyLCBvcHRpb25zKVxufVxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNlY3RzXG4iLCIndXNlIHN0cmljdCdcblxuLy8gZ2l2ZW4gYSBzZXQgb2YgdmVyc2lvbnMgYW5kIGEgcmFuZ2UsIGNyZWF0ZSBhIFwic2ltcGxpZmllZFwiIHJhbmdlXG4vLyB0aGF0IGluY2x1ZGVzIHRoZSBzYW1lIHZlcnNpb25zIHRoYXQgdGhlIG9yaWdpbmFsIHJhbmdlIGRvZXNcbi8vIElmIHRoZSBvcmlnaW5hbCByYW5nZSBpcyBzaG9ydGVyIHRoYW4gdGhlIHNpbXBsaWZpZWQgb25lLCByZXR1cm4gdGhhdC5cbmNvbnN0IHNhdGlzZmllcyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9zYXRpc2ZpZXMuanMnKVxuY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9jb21wYXJlLmpzJylcbm1vZHVsZS5leHBvcnRzID0gKHZlcnNpb25zLCByYW5nZSwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBzZXQgPSBbXVxuICBsZXQgZmlyc3QgPSBudWxsXG4gIGxldCBwcmV2ID0gbnVsbFxuICBjb25zdCB2ID0gdmVyc2lvbnMuc29ydCgoYSwgYikgPT4gY29tcGFyZShhLCBiLCBvcHRpb25zKSlcbiAgZm9yIChjb25zdCB2ZXJzaW9uIG9mIHYpIHtcbiAgICBjb25zdCBpbmNsdWRlZCA9IHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucylcbiAgICBpZiAoaW5jbHVkZWQpIHtcbiAgICAgIHByZXYgPSB2ZXJzaW9uXG4gICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgIGZpcnN0ID0gdmVyc2lvblxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocHJldikge1xuICAgICAgICBzZXQucHVzaChbZmlyc3QsIHByZXZdKVxuICAgICAgfVxuICAgICAgcHJldiA9IG51bGxcbiAgICAgIGZpcnN0ID0gbnVsbFxuICAgIH1cbiAgfVxuICBpZiAoZmlyc3QpIHtcbiAgICBzZXQucHVzaChbZmlyc3QsIG51bGxdKVxuICB9XG5cbiAgY29uc3QgcmFuZ2VzID0gW11cbiAgZm9yIChjb25zdCBbbWluLCBtYXhdIG9mIHNldCkge1xuICAgIGlmIChtaW4gPT09IG1heCkge1xuICAgICAgcmFuZ2VzLnB1c2gobWluKVxuICAgIH0gZWxzZSBpZiAoIW1heCAmJiBtaW4gPT09IHZbMF0pIHtcbiAgICAgIHJhbmdlcy5wdXNoKCcqJylcbiAgICB9IGVsc2UgaWYgKCFtYXgpIHtcbiAgICAgIHJhbmdlcy5wdXNoKGA+PSR7bWlufWApXG4gICAgfSBlbHNlIGlmIChtaW4gPT09IHZbMF0pIHtcbiAgICAgIHJhbmdlcy5wdXNoKGA8PSR7bWF4fWApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlcy5wdXNoKGAke21pbn0gLSAke21heH1gKVxuICAgIH1cbiAgfVxuICBjb25zdCBzaW1wbGlmaWVkID0gcmFuZ2VzLmpvaW4oJyB8fCAnKVxuICBjb25zdCBvcmlnaW5hbCA9IHR5cGVvZiByYW5nZS5yYXcgPT09ICdzdHJpbmcnID8gcmFuZ2UucmF3IDogU3RyaW5nKHJhbmdlKVxuICByZXR1cm4gc2ltcGxpZmllZC5sZW5ndGggPCBvcmlnaW5hbC5sZW5ndGggPyBzaW1wbGlmaWVkIDogcmFuZ2Vcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UuanMnKVxuY29uc3QgQ29tcGFyYXRvciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvY29tcGFyYXRvci5qcycpXG5jb25zdCB7IEFOWSB9ID0gQ29tcGFyYXRvclxuY29uc3Qgc2F0aXNmaWVzID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL3NhdGlzZmllcy5qcycpXG5jb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2NvbXBhcmUuanMnKVxuXG4vLyBDb21wbGV4IHJhbmdlIGByMSB8fCByMiB8fCAuLi5gIGlzIGEgc3Vic2V0IG9mIGBSMSB8fCBSMiB8fCAuLi5gIGlmZjpcbi8vIC0gRXZlcnkgc2ltcGxlIHJhbmdlIGByMSwgcjIsIC4uLmAgaXMgYSBudWxsIHNldCwgT1Jcbi8vIC0gRXZlcnkgc2ltcGxlIHJhbmdlIGByMSwgcjIsIC4uLmAgd2hpY2ggaXMgbm90IGEgbnVsbCBzZXQgaXMgYSBzdWJzZXQgb2Zcbi8vICAgc29tZSBgUjEsIFIyLCAuLi5gXG4vL1xuLy8gU2ltcGxlIHJhbmdlIGBjMSBjMiAuLi5gIGlzIGEgc3Vic2V0IG9mIHNpbXBsZSByYW5nZSBgQzEgQzIgLi4uYCBpZmY6XG4vLyAtIElmIGMgaXMgb25seSB0aGUgQU5ZIGNvbXBhcmF0b3Jcbi8vICAgLSBJZiBDIGlzIG9ubHkgdGhlIEFOWSBjb21wYXJhdG9yLCByZXR1cm4gdHJ1ZVxuLy8gICAtIEVsc2UgaWYgaW4gcHJlcmVsZWFzZSBtb2RlLCByZXR1cm4gZmFsc2Vcbi8vICAgLSBlbHNlIHJlcGxhY2UgYyB3aXRoIGBbPj0wLjAuMF1gXG4vLyAtIElmIEMgaXMgb25seSB0aGUgQU5ZIGNvbXBhcmF0b3Jcbi8vICAgLSBpZiBpbiBwcmVyZWxlYXNlIG1vZGUsIHJldHVybiB0cnVlXG4vLyAgIC0gZWxzZSByZXBsYWNlIEMgd2l0aCBgWz49MC4wLjBdYFxuLy8gLSBMZXQgRVEgYmUgdGhlIHNldCBvZiA9IGNvbXBhcmF0b3JzIGluIGNcbi8vIC0gSWYgRVEgaXMgbW9yZSB0aGFuIG9uZSwgcmV0dXJuIHRydWUgKG51bGwgc2V0KVxuLy8gLSBMZXQgR1QgYmUgdGhlIGhpZ2hlc3QgPiBvciA+PSBjb21wYXJhdG9yIGluIGNcbi8vIC0gTGV0IExUIGJlIHRoZSBsb3dlc3QgPCBvciA8PSBjb21wYXJhdG9yIGluIGNcbi8vIC0gSWYgR1QgYW5kIExULCBhbmQgR1Quc2VtdmVyID4gTFQuc2VtdmVyLCByZXR1cm4gdHJ1ZSAobnVsbCBzZXQpXG4vLyAtIElmIGFueSBDIGlzIGEgPSByYW5nZSwgYW5kIEdUIG9yIExUIGFyZSBzZXQsIHJldHVybiBmYWxzZVxuLy8gLSBJZiBFUVxuLy8gICAtIElmIEdULCBhbmQgRVEgZG9lcyBub3Qgc2F0aXNmeSBHVCwgcmV0dXJuIHRydWUgKG51bGwgc2V0KVxuLy8gICAtIElmIExULCBhbmQgRVEgZG9lcyBub3Qgc2F0aXNmeSBMVCwgcmV0dXJuIHRydWUgKG51bGwgc2V0KVxuLy8gICAtIElmIEVRIHNhdGlzZmllcyBldmVyeSBDLCByZXR1cm4gdHJ1ZVxuLy8gICAtIEVsc2UgcmV0dXJuIGZhbHNlXG4vLyAtIElmIEdUXG4vLyAgIC0gSWYgR1Quc2VtdmVyIGlzIGxvd2VyIHRoYW4gYW55ID4gb3IgPj0gY29tcCBpbiBDLCByZXR1cm4gZmFsc2Vcbi8vICAgLSBJZiBHVCBpcyA+PSwgYW5kIEdULnNlbXZlciBkb2VzIG5vdCBzYXRpc2Z5IGV2ZXJ5IEMsIHJldHVybiBmYWxzZVxuLy8gICAtIElmIEdULnNlbXZlciBoYXMgYSBwcmVyZWxlYXNlLCBhbmQgbm90IGluIHByZXJlbGVhc2UgbW9kZVxuLy8gICAgIC0gSWYgbm8gQyBoYXMgYSBwcmVyZWxlYXNlIGFuZCB0aGUgR1Quc2VtdmVyIHR1cGxlLCByZXR1cm4gZmFsc2Vcbi8vIC0gSWYgTFRcbi8vICAgLSBJZiBMVC5zZW12ZXIgaXMgZ3JlYXRlciB0aGFuIGFueSA8IG9yIDw9IGNvbXAgaW4gQywgcmV0dXJuIGZhbHNlXG4vLyAgIC0gSWYgTFQgaXMgPD0sIGFuZCBMVC5zZW12ZXIgZG9lcyBub3Qgc2F0aXNmeSBldmVyeSBDLCByZXR1cm4gZmFsc2Vcbi8vICAgLSBJZiBHVC5zZW12ZXIgaGFzIGEgcHJlcmVsZWFzZSwgYW5kIG5vdCBpbiBwcmVyZWxlYXNlIG1vZGVcbi8vICAgICAtIElmIG5vIEMgaGFzIGEgcHJlcmVsZWFzZSBhbmQgdGhlIExULnNlbXZlciB0dXBsZSwgcmV0dXJuIGZhbHNlXG4vLyAtIEVsc2UgcmV0dXJuIHRydWVcblxuY29uc3Qgc3Vic2V0ID0gKHN1YiwgZG9tLCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKHN1YiA9PT0gZG9tKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHN1YiA9IG5ldyBSYW5nZShzdWIsIG9wdGlvbnMpXG4gIGRvbSA9IG5ldyBSYW5nZShkb20sIG9wdGlvbnMpXG4gIGxldCBzYXdOb25OdWxsID0gZmFsc2VcblxuICBPVVRFUjogZm9yIChjb25zdCBzaW1wbGVTdWIgb2Ygc3ViLnNldCkge1xuICAgIGZvciAoY29uc3Qgc2ltcGxlRG9tIG9mIGRvbS5zZXQpIHtcbiAgICAgIGNvbnN0IGlzU3ViID0gc2ltcGxlU3Vic2V0KHNpbXBsZVN1Yiwgc2ltcGxlRG9tLCBvcHRpb25zKVxuICAgICAgc2F3Tm9uTnVsbCA9IHNhd05vbk51bGwgfHwgaXNTdWIgIT09IG51bGxcbiAgICAgIGlmIChpc1N1Yikge1xuICAgICAgICBjb250aW51ZSBPVVRFUlxuICAgICAgfVxuICAgIH1cbiAgICAvLyB0aGUgbnVsbCBzZXQgaXMgYSBzdWJzZXQgb2YgZXZlcnl0aGluZywgYnV0IG51bGwgc2ltcGxlIHJhbmdlcyBpblxuICAgIC8vIGEgY29tcGxleCByYW5nZSBzaG91bGQgYmUgaWdub3JlZC4gIHNvIGlmIHdlIHNhdyBhIG5vbi1udWxsIHJhbmdlLFxuICAgIC8vIHRoZW4gd2Uga25vdyB0aGlzIGlzbid0IGEgc3Vic2V0LCBidXQgaWYgRVZFUlkgc2ltcGxlIHJhbmdlIHdhcyBudWxsLFxuICAgIC8vIHRoZW4gaXQgaXMgYSBzdWJzZXQuXG4gICAgaWYgKHNhd05vbk51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCBtaW5pbXVtVmVyc2lvbldpdGhQcmVSZWxlYXNlID0gW25ldyBDb21wYXJhdG9yKCc+PTAuMC4wLTAnKV1cbmNvbnN0IG1pbmltdW1WZXJzaW9uID0gW25ldyBDb21wYXJhdG9yKCc+PTAuMC4wJyldXG5cbmNvbnN0IHNpbXBsZVN1YnNldCA9IChzdWIsIGRvbSwgb3B0aW9ucykgPT4ge1xuICBpZiAoc3ViID09PSBkb20pIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKHN1Yi5sZW5ndGggPT09IDEgJiYgc3ViWzBdLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgaWYgKGRvbS5sZW5ndGggPT09IDEgJiYgZG9tWzBdLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgICAgc3ViID0gbWluaW11bVZlcnNpb25XaXRoUHJlUmVsZWFzZVxuICAgIH0gZWxzZSB7XG4gICAgICBzdWIgPSBtaW5pbXVtVmVyc2lvblxuICAgIH1cbiAgfVxuXG4gIGlmIChkb20ubGVuZ3RoID09PSAxICYmIGRvbVswXS5zZW12ZXIgPT09IEFOWSkge1xuICAgIGlmIChvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBkb20gPSBtaW5pbXVtVmVyc2lvblxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGVxU2V0ID0gbmV3IFNldCgpXG4gIGxldCBndCwgbHRcbiAgZm9yIChjb25zdCBjIG9mIHN1Yikge1xuICAgIGlmIChjLm9wZXJhdG9yID09PSAnPicgfHwgYy5vcGVyYXRvciA9PT0gJz49Jykge1xuICAgICAgZ3QgPSBoaWdoZXJHVChndCwgYywgb3B0aW9ucylcbiAgICB9IGVsc2UgaWYgKGMub3BlcmF0b3IgPT09ICc8JyB8fCBjLm9wZXJhdG9yID09PSAnPD0nKSB7XG4gICAgICBsdCA9IGxvd2VyTFQobHQsIGMsIG9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGVxU2V0LmFkZChjLnNlbXZlcilcbiAgICB9XG4gIH1cblxuICBpZiAoZXFTZXQuc2l6ZSA+IDEpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgbGV0IGd0bHRDb21wXG4gIGlmIChndCAmJiBsdCkge1xuICAgIGd0bHRDb21wID0gY29tcGFyZShndC5zZW12ZXIsIGx0LnNlbXZlciwgb3B0aW9ucylcbiAgICBpZiAoZ3RsdENvbXAgPiAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH0gZWxzZSBpZiAoZ3RsdENvbXAgPT09IDAgJiYgKGd0Lm9wZXJhdG9yICE9PSAnPj0nIHx8IGx0Lm9wZXJhdG9yICE9PSAnPD0nKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvLyB3aWxsIGl0ZXJhdGUgb25lIG9yIHplcm8gdGltZXNcbiAgZm9yIChjb25zdCBlcSBvZiBlcVNldCkge1xuICAgIGlmIChndCAmJiAhc2F0aXNmaWVzKGVxLCBTdHJpbmcoZ3QpLCBvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBpZiAobHQgJiYgIXNhdGlzZmllcyhlcSwgU3RyaW5nKGx0KSwgb3B0aW9ucykpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjIG9mIGRvbSkge1xuICAgICAgaWYgKCFzYXRpc2ZpZXMoZXEsIFN0cmluZyhjKSwgb3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGxldCBoaWdoZXIsIGxvd2VyXG4gIGxldCBoYXNEb21MVCwgaGFzRG9tR1RcbiAgLy8gaWYgdGhlIHN1YnNldCBoYXMgYSBwcmVyZWxlYXNlLCB3ZSBuZWVkIGEgY29tcGFyYXRvciBpbiB0aGUgc3VwZXJzZXRcbiAgLy8gd2l0aCB0aGUgc2FtZSB0dXBsZSBhbmQgYSBwcmVyZWxlYXNlLCBvciBpdCdzIG5vdCBhIHN1YnNldFxuICBsZXQgbmVlZERvbUxUUHJlID0gbHQgJiZcbiAgICAhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJlxuICAgIGx0LnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA/IGx0LnNlbXZlciA6IGZhbHNlXG4gIGxldCBuZWVkRG9tR1RQcmUgPSBndCAmJlxuICAgICFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlICYmXG4gICAgZ3Quc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID8gZ3Quc2VtdmVyIDogZmFsc2VcbiAgLy8gZXhjZXB0aW9uOiA8MS4yLjMtMCBpcyB0aGUgc2FtZSBhcyA8MS4yLjNcbiAgaWYgKG5lZWREb21MVFByZSAmJiBuZWVkRG9tTFRQcmUucHJlcmVsZWFzZS5sZW5ndGggPT09IDEgJiZcbiAgICAgIGx0Lm9wZXJhdG9yID09PSAnPCcgJiYgbmVlZERvbUxUUHJlLnByZXJlbGVhc2VbMF0gPT09IDApIHtcbiAgICBuZWVkRG9tTFRQcmUgPSBmYWxzZVxuICB9XG5cbiAgZm9yIChjb25zdCBjIG9mIGRvbSkge1xuICAgIGhhc0RvbUdUID0gaGFzRG9tR1QgfHwgYy5vcGVyYXRvciA9PT0gJz4nIHx8IGMub3BlcmF0b3IgPT09ICc+PSdcbiAgICBoYXNEb21MVCA9IGhhc0RvbUxUIHx8IGMub3BlcmF0b3IgPT09ICc8JyB8fCBjLm9wZXJhdG9yID09PSAnPD0nXG4gICAgaWYgKGd0KSB7XG4gICAgICBpZiAobmVlZERvbUdUUHJlKSB7XG4gICAgICAgIGlmIChjLnNlbXZlci5wcmVyZWxlYXNlICYmIGMuc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoICYmXG4gICAgICAgICAgICBjLnNlbXZlci5tYWpvciA9PT0gbmVlZERvbUdUUHJlLm1ham9yICYmXG4gICAgICAgICAgICBjLnNlbXZlci5taW5vciA9PT0gbmVlZERvbUdUUHJlLm1pbm9yICYmXG4gICAgICAgICAgICBjLnNlbXZlci5wYXRjaCA9PT0gbmVlZERvbUdUUHJlLnBhdGNoKSB7XG4gICAgICAgICAgbmVlZERvbUdUUHJlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGMub3BlcmF0b3IgPT09ICc+JyB8fCBjLm9wZXJhdG9yID09PSAnPj0nKSB7XG4gICAgICAgIGhpZ2hlciA9IGhpZ2hlckdUKGd0LCBjLCBvcHRpb25zKVxuICAgICAgICBpZiAoaGlnaGVyID09PSBjICYmIGhpZ2hlciAhPT0gZ3QpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChndC5vcGVyYXRvciA9PT0gJz49JyAmJiAhc2F0aXNmaWVzKGd0LnNlbXZlciwgU3RyaW5nKGMpLCBvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGx0KSB7XG4gICAgICBpZiAobmVlZERvbUxUUHJlKSB7XG4gICAgICAgIGlmIChjLnNlbXZlci5wcmVyZWxlYXNlICYmIGMuc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoICYmXG4gICAgICAgICAgICBjLnNlbXZlci5tYWpvciA9PT0gbmVlZERvbUxUUHJlLm1ham9yICYmXG4gICAgICAgICAgICBjLnNlbXZlci5taW5vciA9PT0gbmVlZERvbUxUUHJlLm1pbm9yICYmXG4gICAgICAgICAgICBjLnNlbXZlci5wYXRjaCA9PT0gbmVlZERvbUxUUHJlLnBhdGNoKSB7XG4gICAgICAgICAgbmVlZERvbUxUUHJlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGMub3BlcmF0b3IgPT09ICc8JyB8fCBjLm9wZXJhdG9yID09PSAnPD0nKSB7XG4gICAgICAgIGxvd2VyID0gbG93ZXJMVChsdCwgYywgb3B0aW9ucylcbiAgICAgICAgaWYgKGxvd2VyID09PSBjICYmIGxvd2VyICE9PSBsdCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGx0Lm9wZXJhdG9yID09PSAnPD0nICYmICFzYXRpc2ZpZXMobHQuc2VtdmVyLCBTdHJpbmcoYyksIG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWMub3BlcmF0b3IgJiYgKGx0IHx8IGd0KSAmJiBndGx0Q29tcCAhPT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlcmUgd2FzIGEgPCBvciA+LCBhbmQgbm90aGluZyBpbiB0aGUgZG9tLCB0aGVuIG11c3QgYmUgZmFsc2VcbiAgLy8gVU5MRVNTIGl0IHdhcyBsaW1pdGVkIGJ5IGFub3RoZXIgcmFuZ2UgaW4gdGhlIG90aGVyIGRpcmVjdGlvbi5cbiAgLy8gRWcsID4xLjAuMCA8MS4wLjEgaXMgc3RpbGwgYSBzdWJzZXQgb2YgPDIuMC4wXG4gIGlmIChndCAmJiBoYXNEb21MVCAmJiAhbHQgJiYgZ3RsdENvbXAgIT09IDApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmIChsdCAmJiBoYXNEb21HVCAmJiAhZ3QgJiYgZ3RsdENvbXAgIT09IDApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIHdlIG5lZWRlZCBhIHByZXJlbGVhc2UgcmFuZ2UgaW4gYSBzcGVjaWZpYyB0dXBsZSwgYnV0IGRpZG4ndCBnZXQgb25lXG4gIC8vIHRoZW4gdGhpcyBpc24ndCBhIHN1YnNldC4gIGVnID49MS4yLjMtcHJlIGlzIG5vdCBhIHN1YnNldCBvZiA+PTEuMC4wLFxuICAvLyBiZWNhdXNlIGl0IGluY2x1ZGVzIHByZXJlbGVhc2VzIGluIHRoZSAxLjIuMyB0dXBsZVxuICBpZiAobmVlZERvbUdUUHJlIHx8IG5lZWREb21MVFByZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuLy8gPj0xLjIuMyBpcyBsb3dlciB0aGFuID4xLjIuM1xuY29uc3QgaGlnaGVyR1QgPSAoYSwgYiwgb3B0aW9ucykgPT4ge1xuICBpZiAoIWEpIHtcbiAgICByZXR1cm4gYlxuICB9XG4gIGNvbnN0IGNvbXAgPSBjb21wYXJlKGEuc2VtdmVyLCBiLnNlbXZlciwgb3B0aW9ucylcbiAgcmV0dXJuIGNvbXAgPiAwID8gYVxuICAgIDogY29tcCA8IDAgPyBiXG4gICAgOiBiLm9wZXJhdG9yID09PSAnPicgJiYgYS5vcGVyYXRvciA9PT0gJz49JyA/IGJcbiAgICA6IGFcbn1cblxuLy8gPD0xLjIuMyBpcyBoaWdoZXIgdGhhbiA8MS4yLjNcbmNvbnN0IGxvd2VyTFQgPSAoYSwgYiwgb3B0aW9ucykgPT4ge1xuICBpZiAoIWEpIHtcbiAgICByZXR1cm4gYlxuICB9XG4gIGNvbnN0IGNvbXAgPSBjb21wYXJlKGEuc2VtdmVyLCBiLnNlbXZlciwgb3B0aW9ucylcbiAgcmV0dXJuIGNvbXAgPCAwID8gYVxuICAgIDogY29tcCA+IDAgPyBiXG4gICAgOiBiLm9wZXJhdG9yID09PSAnPCcgJiYgYS5vcGVyYXRvciA9PT0gJzw9JyA/IGJcbiAgICA6IGFcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJzZXRcbiIsIid1c2Ugc3RyaWN0J1xuXG4vLyBqdXN0IHByZS1sb2FkIGFsbCB0aGUgc3R1ZmYgdGhhdCBpbmRleC5qcyBsYXppbHkgZXhwb3J0c1xuY29uc3QgaW50ZXJuYWxSZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvcmUnKVxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9jb25zdGFudHMnKVxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBpZGVudGlmaWVycyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvaWRlbnRpZmllcnMnKVxuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9wYXJzZScpXG5jb25zdCB2YWxpZCA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3ZhbGlkJylcbmNvbnN0IGNsZWFuID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvY2xlYW4nKVxuY29uc3QgaW5jID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvaW5jJylcbmNvbnN0IGRpZmYgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9kaWZmJylcbmNvbnN0IG1ham9yID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvbWFqb3InKVxuY29uc3QgbWlub3IgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9taW5vcicpXG5jb25zdCBwYXRjaCA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3BhdGNoJylcbmNvbnN0IHByZXJlbGVhc2UgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9wcmVyZWxlYXNlJylcbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jb21wYXJlJylcbmNvbnN0IHJjb21wYXJlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvcmNvbXBhcmUnKVxuY29uc3QgY29tcGFyZUxvb3NlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvY29tcGFyZS1sb29zZScpXG5jb25zdCBjb21wYXJlQnVpbGQgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jb21wYXJlLWJ1aWxkJylcbmNvbnN0IHNvcnQgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9zb3J0JylcbmNvbnN0IHJzb3J0ID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvcnNvcnQnKVxuY29uc3QgZ3QgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9ndCcpXG5jb25zdCBsdCA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2x0JylcbmNvbnN0IGVxID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvZXEnKVxuY29uc3QgbmVxID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvbmVxJylcbmNvbnN0IGd0ZSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2d0ZScpXG5jb25zdCBsdGUgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9sdGUnKVxuY29uc3QgY21wID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvY21wJylcbmNvbnN0IGNvZXJjZSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NvZXJjZScpXG5jb25zdCBDb21wYXJhdG9yID0gcmVxdWlyZSgnLi9jbGFzc2VzL2NvbXBhcmF0b3InKVxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3Qgc2F0aXNmaWVzID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvc2F0aXNmaWVzJylcbmNvbnN0IHRvQ29tcGFyYXRvcnMgPSByZXF1aXJlKCcuL3Jhbmdlcy90by1jb21wYXJhdG9ycycpXG5jb25zdCBtYXhTYXRpc2Z5aW5nID0gcmVxdWlyZSgnLi9yYW5nZXMvbWF4LXNhdGlzZnlpbmcnKVxuY29uc3QgbWluU2F0aXNmeWluZyA9IHJlcXVpcmUoJy4vcmFuZ2VzL21pbi1zYXRpc2Z5aW5nJylcbmNvbnN0IG1pblZlcnNpb24gPSByZXF1aXJlKCcuL3Jhbmdlcy9taW4tdmVyc2lvbicpXG5jb25zdCB2YWxpZFJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZXMvdmFsaWQnKVxuY29uc3Qgb3V0c2lkZSA9IHJlcXVpcmUoJy4vcmFuZ2VzL291dHNpZGUnKVxuY29uc3QgZ3RyID0gcmVxdWlyZSgnLi9yYW5nZXMvZ3RyJylcbmNvbnN0IGx0ciA9IHJlcXVpcmUoJy4vcmFuZ2VzL2x0cicpXG5jb25zdCBpbnRlcnNlY3RzID0gcmVxdWlyZSgnLi9yYW5nZXMvaW50ZXJzZWN0cycpXG5jb25zdCBzaW1wbGlmeVJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZXMvc2ltcGxpZnknKVxuY29uc3Qgc3Vic2V0ID0gcmVxdWlyZSgnLi9yYW5nZXMvc3Vic2V0Jylcbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXJzZSxcbiAgdmFsaWQsXG4gIGNsZWFuLFxuICBpbmMsXG4gIGRpZmYsXG4gIG1ham9yLFxuICBtaW5vcixcbiAgcGF0Y2gsXG4gIHByZXJlbGVhc2UsXG4gIGNvbXBhcmUsXG4gIHJjb21wYXJlLFxuICBjb21wYXJlTG9vc2UsXG4gIGNvbXBhcmVCdWlsZCxcbiAgc29ydCxcbiAgcnNvcnQsXG4gIGd0LFxuICBsdCxcbiAgZXEsXG4gIG5lcSxcbiAgZ3RlLFxuICBsdGUsXG4gIGNtcCxcbiAgY29lcmNlLFxuICBDb21wYXJhdG9yLFxuICBSYW5nZSxcbiAgc2F0aXNmaWVzLFxuICB0b0NvbXBhcmF0b3JzLFxuICBtYXhTYXRpc2Z5aW5nLFxuICBtaW5TYXRpc2Z5aW5nLFxuICBtaW5WZXJzaW9uLFxuICB2YWxpZFJhbmdlLFxuICBvdXRzaWRlLFxuICBndHIsXG4gIGx0cixcbiAgaW50ZXJzZWN0cyxcbiAgc2ltcGxpZnlSYW5nZSxcbiAgc3Vic2V0LFxuICBTZW1WZXIsXG4gIHJlOiBpbnRlcm5hbFJlLnJlLFxuICBzcmM6IGludGVybmFsUmUuc3JjLFxuICB0b2tlbnM6IGludGVybmFsUmUudCxcbiAgU0VNVkVSX1NQRUNfVkVSU0lPTjogY29uc3RhbnRzLlNFTVZFUl9TUEVDX1ZFUlNJT04sXG4gIFJFTEVBU0VfVFlQRVM6IGNvbnN0YW50cy5SRUxFQVNFX1RZUEVTLFxuICBjb21wYXJlSWRlbnRpZmllcnM6IGlkZW50aWZpZXJzLmNvbXBhcmVJZGVudGlmaWVycyxcbiAgcmNvbXBhcmVJZGVudGlmaWVyczogaWRlbnRpZmllcnMucmNvbXBhcmVJZGVudGlmaWVycyxcbn1cbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsInJlIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJyZXF1aXJlJCQ0Iiwic2VtdmVyIiwidmFsaWQiLCJyZXF1aXJlJCQ1IiwicmFuZ2UiLCJyZXF1aXJlJCQ2IiwiY29tcGFyYXRvciIsInJlcXVpcmUkJDciLCJjb25zdGFudHMiLCJpZGVudGlmaWVycyIsInJlcXVpcmUkJDgiLCJyZXF1aXJlJCQ5IiwicmVxdWlyZSQkMTAiLCJyZXF1aXJlJCQxMSIsInJlcXVpcmUkJDEyIiwicmVxdWlyZSQkMTMiLCJyZXF1aXJlJCQxNCIsInJlcXVpcmUkJDE1IiwicmVxdWlyZSQkMTYiLCJyZXF1aXJlJCQxNyIsInJlcXVpcmUkJDE4IiwicmVxdWlyZSQkMTkiLCJyZXF1aXJlJCQyMCIsInJlcXVpcmUkJDIxIiwicmVxdWlyZSQkMjIiLCJyZXF1aXJlJCQyMyIsInJlcXVpcmUkJDI0IiwicmVxdWlyZSQkMjUiLCJyZXF1aXJlJCQyNiIsInJlcXVpcmUkJDI3IiwicmVxdWlyZSQkMjgiLCJyZXF1aXJlJCQyOSIsInJlcXVpcmUkJDMwIiwicmVxdWlyZSQkMzEiLCJyZXF1aXJlJCQzMiIsInJlcXVpcmUkJDMzIiwicmVxdWlyZSQkMzQiLCJyZXF1aXJlJCQzNSIsInJlcXVpcmUkJDM2IiwicmVxdWlyZSQkMzciLCJyZXF1aXJlJCQzOCIsInJlcXVpcmUkJDM5IiwicmVxdWlyZSQkNDAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxRQUFNLHNCQUFzQjtBQUU1QixRQUFNLGFBQWE7QUFDbkIsUUFBTSxtQkFBbUIsT0FBTztBQUFBLEVBQ0w7QUFHM0IsUUFBTSw0QkFBNEI7QUFJbEMsUUFBTSx3QkFBd0IsYUFBYTtBQUUzQyxRQUFNLGdCQUFnQjtBQUFBLElBQ3BCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUVBLGNBQWlCO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSx5QkFBeUI7QUFBQSxJQUN6QixZQUFZO0FBQUEsRUFDZDs7Ozs7Ozs7O0FDbENBLFFBQU0sUUFDSixPQUFPLFlBQVksWUFDbkIsOEJBQ0EsMkJBQVksY0FDWixjQUFjLEtBQUssMkJBQVksVUFBVSxJQUN2QyxJQUFJLFNBQVMsUUFBUSxNQUFNLFVBQVUsR0FBRyxJQUFJLElBQzVDLE1BQU07QUFBQSxFQUFDO0FBRVgsWUFBaUI7Ozs7Ozs7O0FDUmpCLFVBQU07QUFBQSxNQUNKO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLElBQUlBLGlCQUFBO0FBQ0osVUFBTSxRQUFRQyxhQUFBO0FBQ2QsY0FBVSxPQUFBLFVBQWlCLENBQUE7QUFHM0IsVUFBTUMsTUFBSyxRQUFBLEtBQWEsQ0FBQTtBQUN4QixVQUFNLFNBQVMsUUFBQSxTQUFpQixDQUFBO0FBQ2hDLFVBQU0sTUFBTSxRQUFBLE1BQWMsQ0FBQTtBQUMxQixVQUFNLFVBQVUsUUFBQSxVQUFrQixDQUFBO0FBQ2xDLFVBQU0sSUFBSSxRQUFBLElBQVksQ0FBQTtBQUN0QixRQUFJLElBQUk7QUFFUixV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UUFBTSxhQUFhQyxrQkFBQTtBQUNuQixRQUFNLGFBQWFDLGFBQUE7QUFDbkIsUUFBTSxVQUFVQyxlQUFBO0FBQ2hCLFFBQU0sTUFBTUMsV0FBQTtBQUNaLFFBQU0sTUFBTUMsV0FBQTtBQUNaLFFBQU0sYUFBYUMsa0JBQUE7QUFDbkIsUUFBTSxnQkFBZ0JDLGdCQUFBO0FBQ3RCLFFBQU0sU0FBU0MsY0FBQTtBQUNmekMsYUFBaUI7QUFBQSxJQUNmO0FBQUEsSUFDQSxPQUFBQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsSUFBSSxXQUFXO0FBQUEsSUFDZixLQUFLLFdBQVc7QUFBQSxJQUNoQixRQUFRLFdBQVc7QUFBQSxJQUNuQixxQkFBcUJNLFdBQVU7QUFBQSxJQUMvQixlQUFlQSxXQUFVO0FBQUEsSUFDekIsb0JBQW9CQyxhQUFZO0FBQUEsSUFDaEMscUJBQXFCQSxhQUFZO0FBQUEsRUFDbkM7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0XX0=
