export class InsertGeneDto {
  symbol: string;
  aliasSymbol: string[];
  prevSymbol: string[];
  name: string;
  aliasName: string[];
  prevName: string[];
  locusType: string;
  geneSynopsis: string;
  geneResource: {
    hgncId: string;
    hgncCuratorNotes: string[];
    ensemblId: string;
    ucscId: string;
    entrezId: string;
    geneGroups: string[];
    hgncGeneGroupId: string[];
  }
  species: {
    name: string;
    shortName: string;
    dataProviderFullName: string;
    dataProviderShortName: string;
    ncbiTaxonId: string;
  };
  nucleotideResource: {
    mane: string[];
    ccdsId: string[];
    refseq: string[];
    insdcId: string[];
  };
  genomeLocation: {
    chromosomalLocation: string;
    chromosome: string;
    start: string;
    end: string;
    assembly: string;
    strand: string;
  };
  proteinResource: {
    uniprotId: string[];
  };
  clinicalResource: {
    omimId: string[];
  }
}
