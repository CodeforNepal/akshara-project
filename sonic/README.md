Sonic Setup

Testing https://github.com/valeriansaliou/sonic/ as a potential replacement for our elasticsearch setup

## Quickstart

```sh
# from project root
docker-compose up sonic

cd test/
yarn install
node index.js
node search.js
```

## Strategy

To approach feature parity with out current setup, we can attempt following [layout](https://github.com/valeriansaliou/sonic#features) in sonic:

| Collection | Bucket | Id | Text | Purpose |
| -----------| -------| -- | -----| ------- |
| sangraha_docs | `default`, `author:<author>`, `genre:<genre>`, `language:<language>` | `<filepath>` | Document title + content | content search results. buckets can be used for filtering |
| sangraga_authors | `default` | `<filepath>::<author>` | Author | author suggestions in the search bar |
| sangraga_titles | `default` | `<filepath>::<title>` | Title | title suggestions in the search bar, as well as prioritize content search by title |

Sonic's suggestion feature is [per-word](https://github.com/valeriansaliou/sonic/issues/162#issuecomment-514092984) (i.e. not next word aware) and are not ranked, so we need to create spearate title/author collections (and run *search*, not *suggest*) for offering suggestions from our search bar.

## Pros

* less of a resource hog
* simple setup/api
* out of the box detection for Nepali language (during lexing)

## Cons

* need another layer to serve the whole document (sonic just returns the doc ids) -- shouldn't be much of a concern since we are planning to add a backend server anyways. We can also probably serve the docs from nginx right now (interpreting sonic results there), if we don't want to introduce another layer right now.
* index is not cached in memory at all so [need SSDs](https://github.com/valeriansaliou/sonic#limitations) for fast searches
* when working with multiple buckets per doc, need to repeat indexing for each bucket (costs on processing + dataset footprint)
* for searches spanning mutliple buckets, need to first search for each bucket and then return the results common across all (from our backend layer)
* searches [don't support](https://github.com/valeriansaliou/sonic/issues/208) stemming (eg: with elastic, `छोरा` [matched](https://sangraha.org/search?q=%E0%A4%9B%E0%A5%8B%E0%A4%B0%E0%A4%BE) `मैले नजन्माएको छोरो`)
* docs that match only some words from the query text are not returned (eg: [this search](https://sangraha.org/search?q=%E0%A4%AE%E0%A5%88%E0%A4%B2%E0%A5%87%20%E0%A4%A8%E0%A4%9C%E0%A4%A8%E0%A5%8D%E0%A4%AE%E0%A4%BE%E0%A4%8F%E0%A4%95%E0%A5%8B%20%E0%A4%9B%E0%A5%8B%E0%A4%B0%E0%A5%8B) would return only the first result, even after ignoring all the stemmed-search results there)
* sonic does not generate facets covering the whole result set. We can probably get away with static facet list for genre/language, since the number of entries there are few (we can even query beforehand by those facet buckets and not display them if there's no results on a facet value). But for authors, this feature would be missed (a partial, not-so-great workaround is constructing list of facet values only for the current result set from the documents themselves, or by using sonic doc ID of form `<language>::<genre>::<author>::<filepath>` -- this list generation can be done client side).
