import { PropertyValue } from '@/shared/kernel/domain/property-value/property-value';
import { Gene } from '../gene.entity';
import { InsertGeneDto } from '../dto/insert-gene.dto';
import { GeneResource } from '../value-objects/gene-resource.vo';
import { Species } from '../value-objects/species.vo';
import { NucleotideResource } from '../value-objects/nucleotide-resource.vo';
import { GenomeLocation } from '../value-objects/genome-location.vo';
import { ProteinResource } from '../value-objects/protein-resource.vo';
import { ClinicalResource } from '../value-objects/clinical-resource.vo';
import { OtherResource } from '../value-objects/other-resource.vo';

export class InsertGeneMapper {
  static toEntity(data: InsertGeneDto) {
    console.log(data);
    const geneResource = this.geneResourceToEntity(data);
    const species = this.geneSpeciesToEntity(data);
    const nucleotideResource = this.nucleotideResourceToEntity(data);
    const genomeLocation = this.genomeLocationToEntity(data);
    const proteinResource = this.proteinResourceToEntity(data);
    const clinicalResource = this.clinicalResourceToEntity(data);
    const otherResource = this.otherResourceToEntity(data);
    const {
      symbol,
      aliasSymbol,
      prevSymbol,
      name,
      aliasName,
      prevName,
      locusType,
      geneSynopsis
    } = data;
    return new Gene({
      symbol,
      aliasSymbol,
      prevSymbol,
      name,
      aliasName,
      prevName,
      locusType,
      geneSynopsis,
      geneResource,
      species,
      nucleotideResource,
      genomeLocation,
      proteinResource,
      clinicalResource,
      otherResource,
    });
  }

  private static otherResourceToEntity(data: InsertGeneDto) {
    return new OtherResource({
      uniprotId: data.proteinResource.uniprotId,
      entrezId: data.geneResource.entrezId,
      hgncId: data.geneResource.hgncId,
    });
  }

  private static clinicalResourceToEntity(data: InsertGeneDto) {
    return new ClinicalResource({
      hgncId: data.geneResource.hgncId,
      omimId: data.clinicalResource.omimId,
      symbol: data.symbol,
      entrezId: data.geneResource.entrezId,
    });
  }

  private static proteinResourceToEntity(data: InsertGeneDto) {
    const { uniprotId } = data.proteinResource;
    return new ProteinResource({
      uniprotId,
    });
  }

  private static genomeLocationToEntity(data: InsertGeneDto) {
    const { chromosomalLocation, chromosome, start, end, assembly, strand } =
      data.genomeLocation;
    return new GenomeLocation({
      chromosomalLocation,
      chromosome,
      start,
      end,
      assembly,
      strand,
    });
  }

  private static geneSpeciesToEntity(data: InsertGeneDto) {
    const { species } = data;
    const {
      name,
      shortName,
      dataProviderFullName,
      dataProviderShortName,
      ncbiTaxonId,
    } = species;
    return new Species({
      name,
      shortName,
      dataProviderFullName,
      dataProviderShortName,
      ncbiTaxonId,
    });
  }

  private static geneResourceToEntity(data: InsertGeneDto) {
    const {
      hgncId,
      hgncCuratorNotes,
      ensemblId,
      ucscId,
      entrezId,
      geneGroups,
      hgncGeneGroupId,
    } = data.geneResource;
    return new GeneResource({
      hgncId,
      hgncCuratorNotes,
      ensemblId,
      ucscId,
      entrezId,
      geneGroups,
      hgncGeneGroupId,
    });
  }

  private static nucleotideResourceToEntity(data: InsertGeneDto) {
    const { mane, ccdsId, refseq, insdcId } = data.nucleotideResource;
    return new NucleotideResource({
      mane,
      ccdsId,
      refseq,
      insdcId,
    });
  }

  static toSupressMetadata(gene: Gene) {
    const geneData: any = {};
    const specialProperties = ['createdAt', 'updatedAt', '_id'];
    Object.keys(gene).forEach((key) => {
      const isSpecialProperties = specialProperties.includes(key);
      if (isSpecialProperties) {
        geneData[key] = gene[key];
      } else {
        const valueIsArray = Array.isArray(gene[key]);
        geneData[key] = valueIsArray
          ? gene[key].map(({ value }: PropertyValue) => value)
          : gene[key].value;
      }
    });
    return geneData;
  }

  static externalAPIsResponseToInsertGeneDTO(response: any): InsertGeneDto {
    const standardizingNonExistentValues = (value) =>
      value === undefined || value.length === 0 ? null : value;

    const geneProperties = {
      symbol: standardizingNonExistentValues(response.symbol),
      aliasSymbol: standardizingNonExistentValues(response.alias_symbol),
      prevSymbol: standardizingNonExistentValues(response.prev_symbol),
      name: standardizingNonExistentValues(response.name),
      aliasName: standardizingNonExistentValues(response.alias_name),
      prevName: standardizingNonExistentValues(response.prev_name),
      locusType: standardizingNonExistentValues(response.locus_type),
      geneSynopsis: standardizingNonExistentValues(response.geneSynopsis)
    };
    const geneResource = {
      hgncId: standardizingNonExistentValues(response.hgnc_id),
      hgncCuratorNotes: standardizingNonExistentValues(response.curator_notes),
      ensemblId: standardizingNonExistentValues(response.ensembl_gene_id),
      ucscId: standardizingNonExistentValues(response.ucsc_id),
      entrezId: standardizingNonExistentValues(response.entrez_id),
      geneGroups: standardizingNonExistentValues(response.gene_group),
      hgncGeneGroupId: standardizingNonExistentValues(response.gene_group_id),
    };

    const species = {
      name: standardizingNonExistentValues(response.species.name),
      shortName: standardizingNonExistentValues(response.species.shortName),
      dataProviderFullName: standardizingNonExistentValues(
        response.species.dataProviderFullName,
      ),
      dataProviderShortName: standardizingNonExistentValues(
        response.species.dataProviderShortName,
      ),
      ncbiTaxonId: standardizingNonExistentValues(response.species.taxonId),
    };

    const nucleotideResource = {
      mane: standardizingNonExistentValues(response.mane_select),
      ccdsId: standardizingNonExistentValues(response.ccds_id),
      refseq: standardizingNonExistentValues(response.refseq_accession),
      insdcId: standardizingNonExistentValues(response.ena),
    };

    const genomeLocation = {
      chromosomalLocation: standardizingNonExistentValues(response.location),
      chromosome: standardizingNonExistentValues(
        response.genomeLocations[0].chromosome,
      ),
      start: standardizingNonExistentValues(response.genomeLocations[0].start),
      end: standardizingNonExistentValues(response.genomeLocations[0].end),
      assembly: standardizingNonExistentValues(
        response.genomeLocations[0].assembly,
      ),
      strand: standardizingNonExistentValues(
        response.genomeLocations[0].strand,
      ),
    };

    const proteinResource = {
      uniprotId: standardizingNonExistentValues(response.uniprot_ids),
    };
    const clinicalResource = {
      omimId: standardizingNonExistentValues(response.omim_id),
    };

    return {
      ...geneProperties,
      geneResource,
      species,
      nucleotideResource,
      genomeLocation,
      proteinResource,
      clinicalResource,
    };
  }
}
