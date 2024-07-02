import {
  Metadata,
  MetadataSource,
} from '@/shared/kernel/domain/metadata/metadata';
import { MetadataSourceAuthorship } from '@/shared/kernel/domain/metadata/metadata-source-authorship';
import { PropertyValue } from '@/shared/kernel/domain/property-value/property-value';

export class GeneResource {
  hgncId: PropertyValue;
  hgncCuratorNotes: PropertyValue[] | PropertyValue;
  hgncReportLink: PropertyValue;
  agrGeneSummaryLink: PropertyValue;
  ensemblId: PropertyValue;
  ensemblSummaryLink: PropertyValue;
  ensemblRegionDetailLink: PropertyValue;
  ensemblGeneSeqLink: PropertyValue;
  ucscId: PropertyValue;
  ucscLink: PropertyValue;
  entrezId: PropertyValue;
  ncbiGeneSummaryLink: PropertyValue;
  geneGroups: PropertyValue[] | PropertyValue;
  hgncGeneGroupsId: PropertyValue[] | PropertyValue;
  hgncGeneGroupsLinks: PropertyValue[] | PropertyValue;

  constructor(properties: {
    hgncId: string;
    hgncCuratorNotes: string[];
    ensemblId: string;
    ucscId: string;
    entrezId: string;
    geneGroups: string[];
    hgncGeneGroupId: string[];
  }) {
    const hgncImportMetadata = new Metadata({
      source: MetadataSource.Import,
      authorship: MetadataSourceAuthorship.available.hgnc,
    });

    this.hgncId = new PropertyValue({
      value: properties?.hgncId,
      metadata: hgncImportMetadata,
    });

    this.hgncCuratorNotes =
      properties?.hgncCuratorNotes === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.hgncCuratorNotes.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.hgncReportLink = new PropertyValue({
      value: this.hgncIdLinks.hgncReportLink,
      metadata: hgncImportMetadata,
    });

    this.agrGeneSummaryLink = new PropertyValue({
      value: this.hgncIdLinks.agrGeneSummaryLink,
      metadata: hgncImportMetadata,
    });

    this.ensemblId = new PropertyValue({
      value: properties?.ensemblId,
      metadata: hgncImportMetadata,
    });

    this.ensemblSummaryLink = new PropertyValue({
      value: this.ensemblLinks?.ensemblSummaryLink,
      metadata: hgncImportMetadata,
    });

    this.ensemblRegionDetailLink = new PropertyValue({
      value: this.ensemblLinks?.ensemblRegionDetailLink,
      metadata: hgncImportMetadata,
    });

    this.ensemblGeneSeqLink = new PropertyValue({
      value: this.ensemblLinks?.ensemblGeneSeqLink,
      metadata: hgncImportMetadata,
    });

    this.ucscId = new PropertyValue({
      value: properties?.ucscId,
      metadata: hgncImportMetadata,
    });

    this.ucscLink = new PropertyValue({
      value:
        properties?.ucscId === null
          ? null
          : `http://genome.cse.ucsc.edu/cgi-bin/hgGene?org=Human&hgg_chrom=none&hgg_type=knownGene&hgg_gene=${properties?.ucscId}`,
      metadata: hgncImportMetadata,
    });

    this.entrezId = new PropertyValue({
      value: properties?.entrezId,
      metadata: hgncImportMetadata,
    });

    this.ncbiGeneSummaryLink = new PropertyValue({
      value:
        properties?.entrezId === null
          ? null
          : `http://view.ncbi.nlm.nih.gov/gene/${properties?.entrezId}`,
      metadata: hgncImportMetadata,
    });

    this.geneGroups =  properties?.geneGroups === null
    ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
    : properties?.geneGroups.map(
      (value) => new PropertyValue({ value, metadata: hgncImportMetadata }),
    );

    this.hgncGeneGroupsId =
      properties?.hgncGeneGroupId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties?.hgncGeneGroupId.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.hgncGeneGroupsLinks =
      properties?.hgncGeneGroupId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties?.hgncGeneGroupId.map(
            (value) =>
              new PropertyValue({
                value: `https://genenames.org/data/genegroup/#!/group/${value}`,
                metadata: hgncImportMetadata,
              }),
          );
  }
  private get ensemblLinks() {
    const ensemblId = this.ensemblId.value;
    const BASE_LINK = `https://www.ensembl.org/Homo_sapiens`;
    if (ensemblId === null) {
      return {
        ensemblSummaryLink: null,
        ensemblRegionDetailLink: null,
        ensemblGeneSeqLink: null,
      };
    } else {
      return {
        ensemblSummaryLink: `${BASE_LINK}/Gene/Summary?g=${ensemblId}`,
        ensemblRegionDetailLink: `${BASE_LINK}/Gene/Sequence?g=${ensemblId}`,
        ensemblGeneSeqLink: `${BASE_LINK}/Location/View?db=core;g=${ensemblId}`,
      };
    }
  }

  private get hgncIdLinks() {
    const hgncId = this.hgncId.value;
    if (hgncId === null) {
      return {
        hgncReportLink: null,
        agrGeneSummaryLink: null,
      };
    } else {
      return {
        hgncReportLink: `https://genenames.org/data/gene-symbol-report/#!/hgnc_id/${hgncId}`,
        agrGeneSummaryLink: `https://www.alliancegenome.org/gene/${hgncId}`,
      };
    }
  }
}
