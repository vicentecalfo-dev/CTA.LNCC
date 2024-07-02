export class MetadataSourceAuthorship {
  id: string;
  name: string;
  description: string;

  constructor(properties: { id: string; name: string; description: string }) {
    Object.assign(this, properties);
  }

  static get available() {
    return {
      hgnc: new MetadataSourceAuthorship({
        id: 'HGNC',
        name: 'HGNC',
        description: 'HUGO Gene Nomenclature Committee',
      }),
      allianceGenome:new MetadataSourceAuthorship({
        id: 'AG',
        name: 'Alliance of Genome Resources',
        description: 'Alliance of Genome Resources',
      })
    };
  }
}
