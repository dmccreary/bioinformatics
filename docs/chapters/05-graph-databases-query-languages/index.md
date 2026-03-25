---
title: Graph Databases and Query Languages
description: Graph database technologies, Cypher and GQL query languages, RDF/SPARQL, schema design, and scalability for bioinformatics
generated_by: claude skill chapter-content-generator
date: 2026-03-24 22:55:15
version: 0.05
---

# Graph Databases and Query Languages

## Summary

Introduces graph database technologies including Neo4j and Memgraph, the Cypher and GQL query languages, RDF and SPARQL, schema design with node labels and relationship types, data loading pipelines, and graph scalability strategies.

## Concepts Covered

This chapter covers the following 35 concepts from the learning graph:

1. Graph Database
2. Relational Database
3. Graph vs Relational Model
4. Neo4j
5. Memgraph
6. Cypher Query Language
7. GQL Query Language
8. MATCH Clause
9. WHERE Clause
10. RETURN Clause
11. CREATE Clause
12. MERGE Clause
13. Graph Pattern Matching
14. Variable-Length Paths
15. Path Queries
16. Aggregation in Cypher
17. Graph Schema Design
18. Node Labels
19. Relationship Types
20. Property Keys
21. Index and Constraints
22. RDF Triple Model
23. Subject-Predicate-Object
24. SPARQL Query Language
25. LPG vs RDF Comparison
26. Graph Data Loading
27. CSV Import to Graph DB
28. ETL for Graph Databases
29. Graph Query Optimization
30. Query Profiling
31. Distributed Graph Databases
32. Graph Partitioning
33. Graph Scalability
34. Graph Transactions
35. Graph Access Control

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Bioinformatics Data Formats](../03-bioinformatics-data-formats/index.md)
- [Chapter 4: Graph Theory Fundamentals](../04-graph-theory-fundamentals/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    In the previous chapter we learned the mathematical language of graphs. Now it is time to put those graphs to work inside real databases that can store millions of biological entities and let us query them in milliseconds. From protein interaction networks to drug-target knowledge graphs, graph databases are transforming how bioinformaticians organize and explore data. Let's connect the dots!

## Why Graph Databases?

Bioinformatics data is fundamentally relational in a way that goes far beyond what the word "relational" means in traditional database theory. A protein interacts with other proteins, is encoded by a gene, participates in pathways, is implicated in diseases, and is targeted by drugs. Each of those statements is a relationship, and the biological questions we care about — "What pathways connect gene X to disease Y?" — require traversing chains of relationships.

A **relational database** stores data in tables (relations) with rows and columns. Relationships between tables are represented through foreign keys and resolved at query time using JOIN operations. Relational databases such as PostgreSQL and MySQL excel at structured, tabular workloads and have served bioinformatics well for decades. The Ensembl genome browser, the UniProt protein knowledgebase, and many other foundational resources are built on relational backends.

However, as the number of JOINs in a query grows, relational query performance degrades rapidly. A query asking "find all proteins within three interaction hops of TP53" requires a three-way self-join on an interaction table — an operation whose cost grows with the square or cube of the table size. This is precisely the kind of query bioinformaticians ask routinely.

| Operation | Relational Database | Graph Database |
|-----------|-------------------|----------------|
| Direct lookup by key | Fast (indexed) | Fast (indexed) |
| One-hop relationship | Fast (single JOIN) | Fast (pointer chase) |
| Multi-hop traversal (3-5 hops) | Slow (multiple JOINs) | Fast (index-free adjacency) |
| Variable-length path queries | Very difficult to express | Native support |
| Schema evolution | Requires ALTER TABLE | Flexible (schema-optional) |

A **graph database** stores data as nodes and edges natively. Instead of computing relationships at query time through JOINs, a graph database stores direct pointers from each node to its neighbors — a design principle called **index-free adjacency**. This means that traversing a relationship takes constant time regardless of the total size of the database, making multi-hop queries dramatically faster than their relational equivalents. This distinction between the **graph vs relational model** is the foundational motivation for adopting graph databases in bioinformatics.

## Graph Database Platforms: Neo4j and Memgraph

The two most widely used graph database platforms in the bioinformatics community are **Neo4j** and **Memgraph**. Both implement the labeled property graph (LPG) model introduced in the previous chapter, and both support the Cypher query language.

**Neo4j** is the most mature and widely adopted graph database. It was first released in 2007 and has become the de facto standard for graph data management. Neo4j stores data on disk using a custom storage engine optimized for graph traversal. It provides a rich ecosystem including the Neo4j Browser for visual exploration, the Neo4j Desktop application, and the APOC (Awesome Procedures on Cypher) library that extends the query language with hundreds of utility functions. Many major bioinformatics knowledge graphs — including Hetionet, the Drug Repurposing Knowledge Graph, and several implementations of the Monarch Initiative data — use Neo4j as their backend.

**Memgraph** is an in-memory graph database that prioritizes query speed for real-time analytical workloads. Because Memgraph holds the entire graph in RAM, it can execute traversals significantly faster than disk-based systems for datasets that fit in memory. Memgraph is fully compatible with the Cypher query language and provides a streaming data integration layer through Apache Kafka connectors. For bioinformatics workflows that require low-latency interactive exploration — such as a web application that lets researchers explore a PPI network on demand — Memgraph offers a compelling alternative to Neo4j.

Both platforms support ACID **graph transactions**, meaning that concurrent reads and writes are isolated from each other and durable in the event of a crash. This property is essential for any production bioinformatics system where multiple users or automated pipelines may be updating the graph simultaneously.

!!! mascot-thinking "What's the Link?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    When choosing between Neo4j and Memgraph, consider your dataset size and query patterns. If your graph fits in RAM and you need sub-millisecond traversal times, Memgraph shines. If you need a mature ecosystem with extensive plugin libraries and community support, Neo4j is the safer choice. Both speak Cypher, so migrating queries between them is straightforward.

## The Cypher Query Language

**Cypher** is a declarative, pattern-matching query language designed specifically for graph databases. Cypher was originally developed by Neo4j and has since been adopted as the basis for the **GQL (Graph Query Language)** standard, which was ratified by ISO in 2024 as ISO/IEC 39075. GQL extends Cypher with additional features for schema management and multi-graph queries, but the core syntax is the same. Learning Cypher today means learning the foundation of the international standard for graph querying.

Cypher's central design idea is that queries are written as ASCII-art patterns that visually resemble the graph structures they describe. Nodes are written in parentheses `()`, relationships are written as arrows `-->` or `--`, and both can carry labels, types, and property filters. This visual syntax makes Cypher remarkably readable compared to SQL for graph-shaped queries.

### The MATCH Clause

The **MATCH clause** is the starting point for almost every Cypher read query. It specifies a graph pattern, and the database engine finds all subgraphs in the data that match that pattern. This process is called **graph pattern matching**.

To find all genes in the database:

```cypher
MATCH (g:Gene)
RETURN g.name
```

To find all proteins that interact with the tumor suppressor TP53:

```cypher
MATCH (p1:Protein {name: 'TP53'})-[:INTERACTS_WITH]->(p2:Protein)
RETURN p2.name, p2.organism
```

In this query, `(p1:Protein {name: 'TP53'})` matches a node with the **node label** `Protein` and the **property key** `name` equal to `'TP53'`. The arrow `-[:INTERACTS_WITH]->` matches an edge with the **relationship type** `INTERACTS_WITH`. The variable names `p1` and `p2` are bindings that let us refer to the matched elements later in the query.

### The WHERE Clause

The **WHERE clause** adds filtering conditions beyond what the pattern itself specifies. You can filter on property values, compare properties between nodes, or use string-matching functions.

```cypher
MATCH (g:Gene)-[:ASSOCIATED_WITH]->(d:Disease)
WHERE d.name CONTAINS 'cancer' AND g.chromosome = '17'
RETURN g.name, d.name
```

The WHERE clause can also filter on structural properties such as the existence of a relationship:

```cypher
MATCH (p:Protein)
WHERE NOT (p)-[:HAS_STRUCTURE]->(:PDBStructure)
RETURN p.name AS proteins_without_structures
```

### The RETURN Clause

The **RETURN clause** specifies what the query should output. It can return entire nodes, individual properties, computed expressions, or aggregations.

```cypher
MATCH (p:Protein)-[r:INTERACTS_WITH]->(p2:Protein)
WHERE p.organism = 'Homo sapiens'
RETURN p.name AS source, p2.name AS target, r.confidence AS score
ORDER BY r.confidence DESC
LIMIT 20
```

### The CREATE and MERGE Clauses

The **CREATE clause** adds new nodes and relationships to the graph. It always creates new elements, even if identical ones already exist.

```cypher
CREATE (g:Gene {name: 'BRCA1', chromosome: '17', organism: 'Homo sapiens'})
CREATE (d:Disease {name: 'Breast Cancer', doid: 'DOID:1612'})
CREATE (g)-[:ASSOCIATED_WITH {source: 'DisGeNET', score: 0.95}]->(d)
```

The **MERGE clause** is a conditional create: it first checks whether the specified pattern already exists, and only creates it if it does not. MERGE is essential for idempotent data loading pipelines where the same import script might run multiple times.

```cypher
MERGE (g:Gene {name: 'BRCA1'})
ON CREATE SET g.chromosome = '17', g.organism = 'Homo sapiens'
ON MATCH SET g.last_updated = datetime()
```

The distinction between CREATE and MERGE is critical for building reliable **ETL (Extract, Transform, Load) pipelines for graph databases**. CREATE is faster but risks duplicates; MERGE is safer but requires unique property combinations to function correctly.

### Variable-Length Paths and Path Queries

One of Cypher's most powerful features is its native support for **variable-length paths** and **path queries**. To find all proteins reachable from TP53 within three interaction hops:

```cypher
MATCH path = (p1:Protein {name: 'TP53'})-[:INTERACTS_WITH*1..3]-(p2:Protein)
RETURN p2.name, length(path) AS hops
ORDER BY hops
```

The syntax `[:INTERACTS_WITH*1..3]` means "follow between 1 and 3 INTERACTS_WITH edges." This is the query that would require multiple self-joins in a relational database but is expressed naturally and executed efficiently in a graph database.

Path queries can also find shortest paths between two nodes:

```cypher
MATCH path = shortestPath(
  (g:Gene {name: 'BRCA1'})-[*..6]-(d:Disease {name: 'Alzheimer disease'})
)
RETURN [node IN nodes(path) | labels(node)[0] + ': ' + node.name] AS path_labels
```

This query finds the shortest path of up to six hops between the BRCA1 gene and Alzheimer disease through any relationship type — a classic knowledge graph exploration pattern.

### Aggregation in Cypher

**Aggregation in Cypher** works similarly to SQL's GROUP BY but is implicit: any non-aggregated column in the RETURN clause automatically becomes a grouping key.

```cypher
MATCH (p:Protein)-[:INTERACTS_WITH]-(neighbor:Protein)
WHERE p.organism = 'Homo sapiens'
RETURN p.name, count(neighbor) AS degree
ORDER BY degree DESC
LIMIT 10
```

This query computes the degree of each human protein in the interaction network and returns the ten most connected hub proteins. Common aggregation functions include `count()`, `sum()`, `avg()`, `min()`, `max()`, and `collect()` (which gathers values into a list).

!!! mascot-thinking "Follow the Edges!"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    Notice how Cypher's ASCII-art syntax makes patterns visually intuitive. The query `(a)-[:INTERACTS_WITH]->(b)` looks like the graph it describes. This visual correspondence is one of the main reasons Cypher has become the dominant graph query language — it reduces the cognitive load of writing and reading graph queries.

## Graph Schema Design for Bioinformatics

Although graph databases are often described as "schema-free," effective use of a graph database requires careful **graph schema design**. The schema defines what **node labels**, **relationship types**, and **property keys** exist in the graph, and how they relate to each other. A well-designed schema makes queries simpler, faster, and less error-prone.

Consider designing a schema for a protein-protein interaction (PPI) knowledge graph. The core entities are proteins, genes, diseases, drugs, pathways, and organisms. Each entity type becomes a node label, and the biological relationships between them become relationship types.

#### Diagram: PPI Knowledge Graph Schema

<iframe src="../../sims/ppi-knowledge-graph-schema/main.html" width="100%" height="480px" scrolling="no" style="overflow: hidden; border: 1px solid #ccc; border-radius: 8px;"></iframe>

<details>
<summary>Diagram Details</summary>

sim-id: ppi-knowledge-graph-schema
Library: vis-network
Status: Specified

Node labels: Protein, Gene, Disease, Drug, Pathway, Organism.
Relationship types: INTERACTS_WITH (Protein-Protein), ENCODED_BY (Protein-Gene), ASSOCIATED_WITH (Gene-Disease), TREATS (Drug-Disease), TARGETS (Drug-Protein), PARTICIPATES_IN (Protein-Pathway), BELONGS_TO (Protein-Organism).

</details>

The schema below formalizes the node labels, relationship types, and key properties:

| Node Label | Key Properties | Description |
|-----------|---------------|-------------|
| Protein | name, uniprot_id, organism | A protein or protein isoform |
| Gene | name, ensembl_id, chromosome | A gene locus |
| Disease | name, doid, category | A disease or phenotype |
| Drug | name, drugbank_id, status | A pharmaceutical compound |
| Pathway | name, reactome_id | A biological pathway |
| Organism | name, taxon_id | A species or strain |

| Relationship Type | From | To | Key Properties |
|-------------------|------|-----|---------------|
| INTERACTS_WITH | Protein | Protein | confidence, detection_method, source |
| ENCODED_BY | Protein | Gene | — |
| ASSOCIATED_WITH | Gene | Disease | score, source, pmid |
| TREATS | Drug | Disease | phase, approval_status |
| TARGETS | Drug | Protein | action, affinity_nM |
| PARTICIPATES_IN | Protein | Pathway | evidence_code |
| BELONGS_TO | Protein | Organism | — |

### Index and Constraints

To ensure data integrity and query performance, graph databases support **indexes and constraints**. A uniqueness constraint guarantees that no two nodes with the same label share the same value for a given property, and it automatically creates an index on that property.

```cypher
CREATE CONSTRAINT gene_name_unique FOR (g:Gene) REQUIRE g.name IS UNIQUE;
CREATE CONSTRAINT protein_uniprot_unique FOR (p:Protein) REQUIRE p.uniprot_id IS UNIQUE;
CREATE INDEX FOR (d:Disease) ON (d.name);
```

Indexes on frequently filtered properties — such as protein names, gene symbols, and disease identifiers — can reduce query execution times by orders of magnitude. Without an index, a MATCH query must scan every node of a given label; with an index, it performs a direct lookup.

## RDF and SPARQL

While the labeled property graph (LPG) model used by Neo4j and Memgraph stores rich properties on nodes and edges, an alternative graph data model called the **RDF (Resource Description Framework) triple model** takes a different approach. In RDF, all information is represented as **subject-predicate-object** triples, where each element is identified by a URI (Uniform Resource Identifier).

For example, the statement "BRCA1 is associated with breast cancer" becomes:

```
<http://identifiers.org/hgnc/BRCA1>
  <http://purl.obolibrary.org/obo/RO_0002200>
    <http://purl.obolibrary.org/obo/DOID_1612> .
```

Each triple is a single statement of fact. Properties that would be stored on a node in an LPG — such as a protein's molecular weight — become additional triples in RDF:

```
<http://identifiers.org/uniprot/P38398>
  <http://purl.obolibrary.org/obo/has_mass>
    "207721"^^xsd:integer .
```

The **SPARQL query language** is the W3C standard for querying RDF data. SPARQL syntax resembles both SQL and Cypher, using triple patterns that are matched against the RDF store:

```sparql
SELECT ?gene ?disease
WHERE {
  ?gene rdf:type <http://purl.obolibrary.org/obo/SO_0000704> .
  ?gene <http://purl.obolibrary.org/obo/RO_0002200> ?disease .
  ?disease rdfs:label "breast cancer" .
}
```

Major bioinformatics RDF resources include UniProt (which provides a SPARQL endpoint at sparql.uniprot.org), the EBI RDF Platform, and the Bio2RDF project that converts dozens of biological databases into interlinked RDF.

### LPG vs RDF: A Concrete Comparison

The **LPG vs RDF comparison** is an important architectural decision for any bioinformatics project. Consider representing a protein interaction with an experimental confidence score.

In the **LPG model** (Cypher):

```cypher
CREATE (p1:Protein {name: 'TP53', uniprot_id: 'P04637'})
CREATE (p2:Protein {name: 'MDM2', uniprot_id: 'Q00987'})
CREATE (p1)-[:INTERACTS_WITH {confidence: 0.95, method: 'co-IP', pmid: 28854362}]->(p2)
```

The confidence score, detection method, and literature reference are stored directly as properties on the relationship edge. This is concise and queryable.

In the **RDF model**, edges cannot carry properties. To attach metadata to a relationship, you must use a technique called reification — creating an intermediate node that represents the relationship itself:

```
_:interaction1 rdf:type :ProteinInteraction .
_:interaction1 :hasParticipant <uniprot:P04637> .
_:interaction1 :hasParticipant <uniprot:Q00987> .
_:interaction1 :hasConfidence "0.95"^^xsd:float .
_:interaction1 :detectionMethod "co-IP" .
_:interaction1 :hasPMID "28854362" .
```

| Feature | LPG (Neo4j/Memgraph) | RDF (Triple Store) |
|---------|----------------------|--------------------|
| Data model | Nodes + edges with properties | Subject-predicate-object triples |
| Edge properties | Native support | Requires reification |
| Schema | Flexible, optional | Ontology-driven (OWL/RDFS) |
| Query language | Cypher / GQL | SPARQL |
| Federated queries | Limited | Native (SPARQL SERVICE) |
| Standardization | GQL (ISO 2024) | W3C standard since 2008 |
| Best for | Traversal-heavy analytics | Semantic interoperability |

For most bioinformatics applications that involve traversal-heavy queries — pathway analysis, network medicine, drug repurposing — the LPG model with Cypher is the more practical choice. For applications that require semantic interoperability across multiple institutions and ontologies — such as the FAIR data sharing initiatives — RDF and SPARQL remain the gold standard.

!!! mascot-tip "Olli's Tip"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    You do not have to choose one model permanently. Tools like Neosemantics (n10s) allow Neo4j to import and export RDF data, giving you LPG traversal performance with RDF interoperability. Many modern bioinformatics projects use a hybrid approach.

## Graph Data Loading

Getting biological data into a graph database is one of the most time-consuming steps in any bioinformatics graph project. The process of **graph data loading** typically involves three phases that mirror a traditional **ETL (Extract, Transform, Load) for graph databases** pipeline.

**Extract.** Biological data arrives in many formats: tab-separated files from STRING, XML from UniProt, JSON from the Ensembl REST API, OBO format from the Gene Ontology. The extraction phase downloads and parses these diverse sources.

**Transform.** The transformation phase maps source data to the target graph schema. This includes resolving identifier conflicts (UniProt ID vs. gene symbol vs. Ensembl ID), normalizing property values, and deduplicating records.

**Load.** The load phase writes the transformed data into the graph database. For Neo4j, the most common approach is **CSV import to graph DB** using the `LOAD CSV` command:

```cypher
// Load proteins from a CSV file
LOAD CSV WITH HEADERS FROM 'file:///proteins.csv' AS row
MERGE (p:Protein {uniprot_id: row.uniprot_id})
SET p.name = row.name,
    p.organism = row.organism,
    p.sequence_length = toInteger(row.length)
```

```cypher
// Load interactions from a CSV file
LOAD CSV WITH HEADERS FROM 'file:///interactions.csv' AS row
MATCH (p1:Protein {uniprot_id: row.protein1})
MATCH (p2:Protein {uniprot_id: row.protein2})
MERGE (p1)-[r:INTERACTS_WITH]->(p2)
SET r.confidence = toFloat(row.combined_score),
    r.source = row.source_database
```

For large-scale imports (millions of nodes and edges), Neo4j provides the `neo4j-admin import` tool, which bypasses the transactional engine and writes directly to the storage files. This tool can load billions of relationships in minutes rather than hours but requires the database to be offline during the import.

!!! mascot-warning "Watch Out!"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    Always create uniqueness constraints and indexes **before** loading data, not after. Loading millions of nodes without an index on the MERGE property causes quadratic lookup times — a common mistake that can turn a ten-minute import into a ten-hour ordeal.

## Graph Query Optimization and Profiling

Writing correct Cypher queries is one skill; writing efficient Cypher queries is another. **Graph query optimization** involves structuring queries so that the database engine can execute them with minimal work.

The most important optimization principle is to **start from the most selective pattern**. If your query involves a rare node (e.g., a specific gene) and a common node (e.g., any protein), begin the MATCH pattern with the rare node. The database engine anchors the pattern match on the starting node and expands outward, so starting from a selective anchor dramatically reduces the search space.

```cypher
// Good: starts from the specific gene (selective anchor)
MATCH (g:Gene {name: 'TP53'})-[:ENCODED_BY]-(p:Protein)-[:INTERACTS_WITH]-(p2:Protein)
RETURN p2.name

// Bad: starts from all proteins (large scan)
MATCH (p2:Protein)-[:INTERACTS_WITH]-(p:Protein)-[:ENCODED_BY]-(g:Gene {name: 'TP53'})
RETURN p2.name
```

**Query profiling** is the tool that makes optimization evidence-based rather than guesswork. Both Neo4j and Memgraph support the `PROFILE` and `EXPLAIN` prefixes:

```cypher
PROFILE
MATCH (g:Gene {name: 'TP53'})-[:ASSOCIATED_WITH]->(d:Disease)
RETURN d.name
```

The `PROFILE` command executes the query and returns a detailed execution plan showing how many database hits each operator performed. The `EXPLAIN` command shows the planned execution strategy without actually running the query. Key metrics to examine include:

- **DbHits**: The number of storage-level operations. Lower is better.
- **Rows**: The number of intermediate result rows at each step. A sudden explosion in rows indicates a combinatorial blowup.
- **Estimated Rows**: The planner's estimate; a large discrepancy between estimated and actual rows suggests stale statistics.

## Distributed Graph Databases and Scalability

As biological knowledge graphs grow to billions of edges — the full STRING database contains over 20 billion scored protein interactions across all organisms — the question of **graph scalability** becomes critical. A single-server graph database eventually runs out of memory or disk bandwidth, requiring a **distributed graph databases** architecture.

**Graph partitioning** is the fundamental challenge of distributed graph databases. Unlike relational tables, which can be split by row ranges or hash values with relatively little cross-partition communication, graphs have dense interconnections that resist clean partitioning. If two highly connected proteins end up on different servers, every traversal between them requires a network round-trip, dramatically increasing query latency.

Common partitioning strategies include:

- **Hash partitioning**: Assigns nodes to partitions based on a hash of their identifier. Simple but ignores graph structure, leading to many cross-partition edges.
- **Label-based partitioning**: Places all nodes of a given label on the same partition. Works well when queries tend to stay within a label (e.g., protein-protein queries), but fails for cross-label traversals.
- **Community-based partitioning**: Uses graph clustering algorithms to identify densely connected communities and keeps each community on the same partition. This minimizes cross-partition edges but requires an expensive preprocessing step.

Neo4j addresses scalability through its **Fabric** architecture, which allows queries to span multiple databases. Memgraph is designed for vertical scaling — fitting larger graphs into the memory of a single large server — but is adding distributed features in recent releases.

### Graph Transactions and Access Control

Production graph databases must support robust **graph transactions** with ACID properties (Atomicity, Consistency, Isolation, Durability). In a bioinformatics context, transactions ensure that a multi-step data import — creating a protein node, linking it to its gene, and adding its pathway memberships — either completes entirely or rolls back entirely, leaving the database in a consistent state.

**Graph access control** governs who can read, write, and administer the graph. Neo4j Enterprise Edition provides role-based access control (RBAC) that can restrict access at the level of the entire database, specific node labels, or even individual properties. For example, a clinical bioinformatics graph might allow all users to read protein interactions but restrict patient genotype data to authorized clinicians:

```cypher
// Grant read access to the Protein label for all analysts
GRANT READ {*} ON GRAPH biology NODES Protein TO analyst_role;

// Restrict Patient nodes to clinical staff only
GRANT READ {*} ON GRAPH biology NODES Patient TO clinical_role;
DENY READ {*} ON GRAPH biology NODES Patient TO analyst_role;
```

These access control features are essential for bioinformatics applications that handle protected health information (PHI) or other sensitive data subject to regulatory requirements such as HIPAA.

!!! mascot-thinking "What's the Link?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    Graph databases bring together ideas from several fields: database theory gives us transactions and query optimization, graph theory gives us traversal algorithms and centrality measures, and distributed systems gives us partitioning and replication strategies. The power of a graph database comes from combining all three in a single, purpose-built system.

## Putting It All Together: A Bioinformatics Workflow

To see how these concepts work in concert, consider a realistic bioinformatics workflow: building a drug repurposing knowledge graph. The goal is to find existing drugs that might treat a new disease by identifying shared molecular mechanisms.

**Step 1: Design the schema.** Define node labels (Drug, Protein, Gene, Disease, Pathway) and relationship types (TARGETS, INTERACTS_WITH, ASSOCIATED_WITH, PARTICIPATES_IN, TREATS).

**Step 2: Create constraints and indexes.**

```cypher
CREATE CONSTRAINT FOR (d:Drug) REQUIRE d.drugbank_id IS UNIQUE;
CREATE CONSTRAINT FOR (p:Protein) REQUIRE p.uniprot_id IS UNIQUE;
CREATE CONSTRAINT FOR (g:Gene) REQUIRE g.ensembl_id IS UNIQUE;
CREATE CONSTRAINT FOR (dis:Disease) REQUIRE dis.doid IS UNIQUE;
CREATE INDEX FOR (p:Protein) ON (p.name);
CREATE INDEX FOR (g:Gene) ON (g.name);
```

**Step 3: Load data from CSV files** using LOAD CSV with MERGE to handle re-runs safely.

**Step 4: Query for drug repurposing candidates.**

```cypher
MATCH (existing_drug:Drug)-[:TREATS]->(known_disease:Disease {name: 'Rheumatoid Arthritis'})
MATCH (existing_drug)-[:TARGETS]->(shared_target:Protein)
MATCH (shared_target)<-[:TARGETS]-(candidate_drug:Drug)
WHERE NOT (candidate_drug)-[:TREATS]->(known_disease)
RETURN candidate_drug.name AS repurposing_candidate,
       shared_target.name AS shared_protein_target,
       count(*) AS shared_targets
ORDER BY shared_targets DESC
LIMIT 10
```

This query finds drugs that share protein targets with known rheumatoid arthritis treatments but are not themselves approved for rheumatoid arthritis — identifying them as repurposing candidates. In a relational database, this query would require at least four JOIN operations across large tables. In Cypher, it reads almost like natural language.

!!! mascot-celebration "Great Work, Explorers!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You now have the tools to store biological networks in graph databases, query them with Cypher, and scale them to handle the enormous datasets that modern bioinformatics demands. In the coming chapters, we will build on these skills to construct biomedical knowledge graphs, run graph algorithms, and apply graph machine learning to real biological problems. Onwards!

## Key Takeaways

- A **graph database** stores data as nodes and edges with index-free adjacency, enabling fast multi-hop traversals that would require expensive JOINs in a relational database.
- **Neo4j** (disk-based, mature ecosystem) and **Memgraph** (in-memory, low latency) are the two leading graph database platforms for bioinformatics, and both support the **Cypher query language**.
- **GQL** (ISO/IEC 39075) is the new international standard for graph queries, based on Cypher syntax.
- Cypher's core clauses — **MATCH**, **WHERE**, **RETURN**, **CREATE**, and **MERGE** — provide a complete vocabulary for reading and writing graph data using intuitive ASCII-art **graph pattern matching**.
- **Variable-length paths** and **path queries** are Cypher's killer feature for bioinformatics, enabling multi-hop exploration of biological networks in a single query.
- Effective **graph schema design** defines **node labels**, **relationship types**, and **property keys** that model biological entities and their relationships, supported by **indexes and constraints** for performance and data integrity.
- The **RDF triple model** represents data as **subject-predicate-object** triples queried with **SPARQL**, offering strong semantic interoperability at the cost of verbose representation. The **LPG model** offers native edge properties and faster traversal performance.
- **Graph data loading** follows an **ETL** pattern: extract from biological data sources, transform to the target schema, and load via **CSV import** or bulk import tools. Always create indexes before loading.
- **Graph query optimization** relies on selective anchoring and **query profiling** with PROFILE/EXPLAIN to minimize database hits.
- **Graph scalability** for billion-edge biological networks requires **distributed graph databases** with careful **graph partitioning** strategies, robust **graph transactions**, and fine-grained **graph access control**.

[See Annotated References](./references.md)
