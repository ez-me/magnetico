# Fork Reason

I wanted to have newer binaries, alongside arm (well, namely Termux).
Remove Docker and CI/Travis/Unneded files for this small fork.

Also to learn a bit of Go (maybe).

# magnetico
*Autonomous (self-hosted) BitTorrent DHT search engine suite.*

magnetico is the first autonomous (self-hosted) BitTorrent DHT search engine suite that is *designed
for end-users*. The suite consists of two packages:

- <code>magneticod</code>: Autonomous BitTorrent DHT crawler and metadata fetcher.
- <code>magneticow</code>: Lightweight web interface for magnetico.

Both programs, combined together, allows anyone with a decent Internet connection to access the vast
amount of torrents waiting to be discovered within the BitTorrent DHT space, *without relying on any
central entity*.

**magnetico** liberates BitTorrent from the yoke of centralised trackers & web-sites and makes it
*truly decentralised*. Finally!

## Features
- Easy installation & minimal requirements:
  - [Pre-compiled static binaries](https://github.com/ez-me/magnetico/releases) are provided.
  - Root access is *not* required to install or to use.
- Near-zero configuration:
  - Both programs work out of the box, and <code>magneticow</code> can be used without a web-server too.
  - Detailed, step-by-step manual to guide you through the installation.
- No reliance on any centralised entity:
  - <code>magneticod</code> trawls the BitTorrent DHT by "going" from one node to another, and fetches the
    metadata using the nodes without using trackers.
- High performance implementation in Go:
  - <code>magneticod</code> utilizes every bit of your resources to discover as many infohashes & metadata as
    possible.
- Built-in lightweight web interface:
  - <code>magneticow</code> features a lightweight web interface to help you access the database without
    getting on your way.

## Why?
BitTorrent, being a distributed P2P file sharing protocol, has long suffered because of the
centralised entities that people depended on for searching torrents (websites) and for discovering
other peers (trackers). Introduction of DHT (distributed hash table) eliminated the need for
trackers, allowing peers to discover each other through other peers and to fetch metadata from the
leechers & seeders in the network. **magnetico** is the finishing move that allows users to search
for torrents in the network, hence removing the need for centralised torrent websites.

## Installation Instructions
> **WARNING:**
>
> **magnetico** is still under active construction, and is considered *alpha* software. Please
> use **magnetico** suite with care and follow the installation instructions carefully to install
> it & secure the installation. Feel perfectly free to send bug reports, suggestions, or whatever
> comes to your mind to send to us through GitHub.

1. Install <code>magneticod</code> first by following its [installation instructions](cmd/magneticod/README.md).
2. Install <code>magneticow</code> afterwards by following its
   [installation instructions](cmd/magneticow/README.md).

If you can't run the release binaries provided by me, just follow the usual clone and make.
Keep in mind you require [go-bindata](https://github.com/kevinburke/go-bindata).

```bash
git clone --depth=1 https://github.com/ez-me/magnetico.git
cd magnetico
make all
```

You should be able to access magneticow at <http://localhost:8080>.

## License

All the code is licensed under AGPLv3, unless stated otherwise specifically. See `COPYING` for
details.


----

Dedicated to Cemile Binay, in whose hands [Bora] thrived.

Bora M. ALPER <bora at boramalper dot org>
