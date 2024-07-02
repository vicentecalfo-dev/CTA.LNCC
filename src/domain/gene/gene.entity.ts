import { PropertyValue } from '@/shared/kernel/domain/property-value/property-value';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { NucleotideResource } from './value-objects/nucleotide-resource.vo';
import { GenomeLocation } from './value-objects/genome-location.vo';
import { ProteinResource } from './value-objects/protein-resource.vo';
import { ClinicalResource } from './value-objects/clinical-resource.vo';
import { OtherResource } from './value-objects/other-resource.vo';
import { Species } from './value-objects/species.vo';
import { GeneResource } from './value-objects/gene-resource.vo';
import {
  Metadata,
  MetadataSource,
} from '@/shared/kernel/domain/metadata/metadata';
import { MetadataSourceAuthorship } from '@/shared/kernel/domain/metadata/metadata-source-authorship';

@Entity({
  name: 'genes',
})
export class Gene {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  species: Species;

  @Column({ nullable: false })
  symbol: PropertyValue;

  @Column('simple-array')
  aliasSymbol: PropertyValue[] | PropertyValue;

  @Column('simple-array')
  prevSymbol: PropertyValue[] | PropertyValue;

  @Column({ nullable: false })
  name: PropertyValue;

  @Column('simple-array')
  aliasName: PropertyValue[] | PropertyValue;

  @Column('simple-array')
  prevName: PropertyValue[] | PropertyValue;

  @Column()
  locusType: PropertyValue;

  @Column()
  geneSynopsis: PropertyValue;

  @Column()
  geneResource: GeneResource;

  @Column()
  nucleotideResource: NucleotideResource;

  @Column()
  genomeLocation: GenomeLocation;

  @Column()
  proteinResource: ProteinResource;

  @Column()
  clinicalResource: ClinicalResource;

  @Column()
  otherResource: OtherResource;

  @Column({ type: 'datetime' })
  createdAt: Date | null;

  @Column({ type: 'datetime' })
  updatedAt: Date | null;

  // @Column()
  // reference: any;

  constructor(properties: {
    _id?: string;
    symbol: string;
    aliasSymbol: string[];
    prevSymbol: string[];
    name: string;
    aliasName: string[];
    prevName: string[];
    locusType: string;
    geneSynopsis: string;
    geneResource: GeneResource;
    species: Species;
    nucleotideResource: NucleotideResource;
    genomeLocation:GenomeLocation;
    proteinResource: ProteinResource;
    clinicalResource: ClinicalResource;
    otherResource: OtherResource
    createdAt?: Date | null;
    updatedAt?: Date | null;
  }) {
    const hgncImportMetadata = new Metadata({
      source: MetadataSource.Import,
      authorship: MetadataSourceAuthorship.available.hgnc,
    });

    this.symbol = new PropertyValue({
      value: properties?.symbol,
      metadata: hgncImportMetadata,
    });

    this.aliasSymbol =
      properties?.aliasSymbol === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties?.aliasSymbol.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.prevSymbol =
      properties?.prevSymbol === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties?.prevSymbol.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.name = new PropertyValue({
      value: properties?.name,
      metadata: hgncImportMetadata,
    });

    this.aliasName =
      properties?.aliasName === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties?.aliasName.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.prevName =
      properties?.prevName === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties?.prevName.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.locusType = new PropertyValue({
      value: properties?.locusType,
      metadata: hgncImportMetadata,
    });

    
    this.geneSynopsis = new PropertyValue({
      value: properties?.geneSynopsis,
      metadata: hgncImportMetadata,
    });

    this.geneResource = properties?.geneResource;

    this.nucleotideResource = properties?.nucleotideResource;

    this.species = properties?.species;

    this.genomeLocation = properties?.genomeLocation;

    this.proteinResource = properties?.proteinResource;

    this.clinicalResource = properties?.clinicalResource;

    this.otherResource = properties?.otherResource;

    this.createdAt = this.createdAt ?? new Date();

    this.updatedAt = this.updatedAt ?? new Date();
  }
}
