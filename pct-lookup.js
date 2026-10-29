/* PCT Heading lookup for Yusr Duty/Taxes Calculator. Needs tariff-2026-27.js loaded first. */
(function (g) {
  const T = g.PCT_TARIFF_2026_27;
  const index = new Map();
  T.rows.forEach(r => index.set(r[0].replace('.', ''), r));
  const FLAG_TEXT = {
    S: 'Specific (per-unit) duty also applies; the tariff gives only the ad valorem part. Enter the specific duty manually.',
    C: 'CD is missing in the tariff data. Enter it manually.',
    R: 'RD is unclear in the source. Enter it manually.',
    A: 'ACD is missing in the tariff data. Enter it manually.',
    F: 'FED is not a simple percentage of import value for this heading (retail price or per-unit basis). Enter it manually.',
    T: 'Sales tax is conditional (marked *). Check the Sixth Schedule condition.',
    B: 'Import Policy Order has a BANNED entry for this heading (often only for specific goods). Check the Import Policy Order.',
    X: 'Import Policy Order has a RESTRICTED entry (conditions apply). Check the Import Policy Order.'
  };
  g.PCTLookup = {
    edition: T.edition,
    normalize: s => String(s || '').replace(/[^0-9]/g, ''),
    find(input) {
      const k = this.normalize(input);
      if (k.length !== 8) return null;
      const r = index.get(k);
      if (!r) return null;
      return { pct: r[0], desc: r[1], cd: r[2], acd: r[3], rd: r[4], fed: r[5], st: r[6],
               flags: r[7], note: r[8], page: r[9], fednote: r[10],
               warnings: r[7].split('').filter(f => FLAG_TEXT[f]).map(f => FLAG_TEXT[f] + (f === 'F' && r[10] ? ' Tariff says: ' + r[10] : '')) };
    },
    /* Suggestions when the exact 8-digit code is not in the tariff */
    suggest(input, max = 8) {
      const k = this.normalize(input);
      if (k.length < 4) return [];
      const out = [];
      for (const [key, r] of index) { if (key.startsWith(k)) { out.push(r[0] + '  ' + r[1].slice(0, 60)); if (out.length >= max) break; } }
      return out;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
