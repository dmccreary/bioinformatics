# Quiz: Graph Databases and Query Languages

Test your understanding of graph database technologies, the Cypher query language, RDF/SPARQL, schema design, and data loading pipelines for bioinformatics.

---

#### 1. What is "index-free adjacency" and why does it make graph databases faster than relational databases for multi-hop queries?

<div class="upper-alpha" markdown>
1. It means graph databases do not support indexing, which simplifies query planning
2. It means each node stores direct pointers to its neighbors, so traversing a relationship takes constant time regardless of database size
3. It means graph databases store all data in a single table without foreign keys
4. It means graph databases use SQL JOINs internally but hide them from the user
</div>

??? question "Show Answer"
    The correct answer is **B**. Index-free adjacency means that each node in a graph database stores direct physical pointers to its neighboring nodes. Traversing a relationship follows these pointers in constant time, regardless of total database size. In contrast, relational databases must compute relationships at query time through JOIN operations, whose cost grows with table size. This makes multi-hop traversals (3-5 hops) dramatically faster in graph databases.

    **Concept Tested:** Graph Database and Graph vs Relational Model

---

#### 2. What is the purpose of the MERGE clause in Cypher, and how does it differ from CREATE?

<div class="upper-alpha" markdown>
1. MERGE deletes existing nodes before creating new ones, while CREATE preserves existing data
2. MERGE only works with relationship types, while CREATE only works with nodes
3. MERGE checks whether a pattern already exists before creating it, preventing duplicates, while CREATE always creates new elements
4. MERGE is used for read-only queries, while CREATE is used for write operations
</div>

??? question "Show Answer"
    The correct answer is **C**. The MERGE clause is a conditional create: it first checks whether the specified pattern exists in the database and only creates it if it does not. This makes MERGE essential for idempotent data loading pipelines where import scripts may run multiple times. CREATE always adds new elements regardless of whether identical ones already exist, which risks creating duplicates. Both work with nodes and relationships.

    **Concept Tested:** MERGE Clause

---

#### 3. In Cypher, what does the syntax `[:INTERACTS_WITH*1..3]` represent in a MATCH pattern?

<div class="upper-alpha" markdown>
1. Exactly three INTERACTS_WITH relationships in sequence
2. A variable-length path following between 1 and 3 INTERACTS_WITH edges
3. A filter that selects relationships with a confidence score between 1 and 3
4. Three separate queries that are combined into a single result
</div>

??? question "Show Answer"
    The correct answer is **B**. The `*1..3` syntax specifies a variable-length path, meaning the pattern matches paths that follow between 1 and 3 INTERACTS_WITH edges. This is one of Cypher's most powerful features, enabling multi-hop traversal queries that would require multiple self-joins in a relational database. For example, finding all proteins within three interaction hops of TP53 is expressed naturally with this syntax.

    **Concept Tested:** Variable-Length Paths

---

#### 4. How does the RDF triple model differ from the labeled property graph (LPG) model in handling edge properties?

<div class="upper-alpha" markdown>
1. RDF natively supports edge properties while LPG does not
2. Both models handle edge properties identically
3. LPG stores properties directly on edges, while RDF requires reification — creating an intermediate node to represent the relationship
4. RDF uses JSON properties while LPG uses XML properties
</div>

??? question "Show Answer"
    The correct answer is **C**. In the LPG model, edges can carry key-value properties directly (e.g., a confidence score on an INTERACTS_WITH edge). In RDF, all information is represented as subject-predicate-object triples, and edges cannot carry properties. To attach metadata to a relationship in RDF, you must use reification — creating an intermediate node that represents the relationship itself and adding triples to describe its properties. This makes LPG more concise for property-rich relationships.

    **Concept Tested:** LPG vs RDF Comparison

---

#### 5. Why should uniqueness constraints and indexes be created before loading data into a graph database?

<div class="upper-alpha" markdown>
1. The database will refuse to load any data without constraints defined first
2. Constraints can only be created on empty databases
3. Loading without indexes on MERGE properties causes quadratic lookup times, turning minutes of import into hours
4. Indexes compress the data during loading, reducing storage requirements
</div>

??? question "Show Answer"
    The correct answer is **C**. When using MERGE to load data, the database must check whether each pattern already exists. Without an index on the MERGE property, this check requires scanning all nodes with that label for each record — resulting in quadratic time complexity. Creating indexes before loading enables direct lookups, dramatically reducing import time. Constraints also ensure data integrity by preventing duplicate entries during the loading process.

    **Concept Tested:** Index and Constraints

---

#### 6. What query language is used to query RDF triple stores, and which standards body maintains it?

<div class="upper-alpha" markdown>
1. Cypher, maintained by ISO
2. GQL, maintained by the IEEE
3. SQL, maintained by ANSI
4. SPARQL, maintained by the W3C
</div>

??? question "Show Answer"
    The correct answer is **D**. SPARQL is the W3C standard query language for querying RDF data, standardized since 2008. SPARQL uses triple patterns matched against the RDF store, with syntax resembling both SQL and Cypher. Major bioinformatics RDF resources include UniProt's SPARQL endpoint and the Bio2RDF project. Cypher (A) is for LPG databases, and GQL (B) is the ISO standard based on Cypher for property graph databases.

    **Concept Tested:** SPARQL Query Language

---

#### 7. In a graph database schema for a bioinformatics knowledge graph, what does a "relationship type" represent?

<div class="upper-alpha" markdown>
1. The physical storage format of edges on disk
2. A named category describing the nature of the connection between two nodes, such as INTERACTS_WITH or ASSOCIATED_WITH
3. The maximum number of edges allowed between two nodes
4. A constraint that prevents cycles in the graph
</div>

??? question "Show Answer"
    The correct answer is **B**. In a labeled property graph schema, relationship types are named categories that describe the biological nature of connections between nodes. Examples include INTERACTS_WITH (protein-protein), ENCODED_BY (protein-gene), ASSOCIATED_WITH (gene-disease), and TARGETS (drug-protein). Relationship types, along with node labels and property keys, form the graph schema that organizes heterogeneous biological data into a queryable structure.

    **Concept Tested:** Relationship Types

---

#### 8. What are the three phases of an ETL pipeline for loading biological data into a graph database?

<div class="upper-alpha" markdown>
1. Encrypt, Transfer, Lock
2. Extract, Transform, Load
3. Evaluate, Test, Launch
4. Edit, Tabulate, Link
</div>

??? question "Show Answer"
    The correct answer is **B**. ETL stands for Extract, Transform, Load. The Extract phase downloads and parses data from diverse biological sources (STRING, UniProt, Ensembl). The Transform phase maps source data to the target graph schema, resolves identifier conflicts, normalizes values, and deduplicates records. The Load phase writes transformed data into the graph database using commands like LOAD CSV or bulk import tools like neo4j-admin import.

    **Concept Tested:** ETL for Graph Databases

---

#### 9. What is the most important optimization principle when writing Cypher queries for graph databases?

<div class="upper-alpha" markdown>
1. Always use the longest possible variable-length paths
2. Avoid using WHERE clauses entirely
3. Start the MATCH pattern from the most selective (rarest) node to minimize the search space
4. Return all properties of every node to avoid additional queries
</div>

??? question "Show Answer"
    The correct answer is **C**. The most important optimization principle is to start from the most selective pattern. If a query involves a rare node (e.g., a specific gene name) and common nodes (e.g., any protein), beginning the MATCH with the rare node allows the database engine to anchor the pattern match on a small set of starting points and expand outward, dramatically reducing the search space compared to starting from a large scan of common nodes.

    **Concept Tested:** Graph Query Optimization

---

#### 10. Which graph database platform holds the entire graph in RAM for sub-millisecond traversal times, making it suitable for real-time interactive exploration?

<div class="upper-alpha" markdown>
1. PostgreSQL
2. Neo4j
3. Memgraph
4. MySQL
</div>

??? question "Show Answer"
    The correct answer is **C**. Memgraph is an in-memory graph database that holds the entire graph in RAM, enabling significantly faster traversals than disk-based systems for datasets that fit in memory. It is fully compatible with the Cypher query language and is well-suited for web applications requiring low-latency interactive exploration of biological networks. Neo4j (B) stores data on disk using a custom storage engine, while PostgreSQL (A) and MySQL (D) are relational databases.

    **Concept Tested:** Memgraph
