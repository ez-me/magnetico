# magneticod
*Autonomous BitTorrent DHT crawler and metadata fetcher.*

<code>magneticod</code> is the daemon that crawls the BitTorrent DHT network in the background to discover info hashes and
fetches metadata from the peers.

## Installation

### Requirements
- Decent Internet access (IPv4)

  <code>magneticod</code> uses UDP protocol to communicate with the nodes in the DHT network, and TCP to communicate with the
  peers while fetching metadata. **Please make sure you have a healthy connection;** you can confirm this by checking at
  the *connection status indicator* of your BitTorrent client: if it does not indicate any error (*e.g.* a misconfigured NAT),
  <code>magneticod</code> should just work fine.

### Installing the Pre-Compiled Static Binary
You can find the latest pre-compiled static binaries on [GitHub](https://github.com/ez-me/magnetico/releases)
for versions from v0.12.0 onwards. 

### Compiling yourself

If you can't run the release binaries provided by me, just follow the usual clone and make.

```bash
git clone --depth=1 https://github.com/ez-me/magnetico.git
cd magnetico
make magneticod
```


## Setup
1. (Optional, **requires root**) Disable iptables for a specified port:
   
   ```bash
   iptables -I OUTPUT -t raw -p udp --sport PORT_NUMBER -j NOTRACK
   iptables -I PREROUTING -t raw -p udp --dport PORT_NUMBER -j NOTRACK
   ```
   
   This is to prevent excessive number of ``EPERM`` "Operation not permitted" errors, which also has a negative impact
   on the performance.

## Usage
### Database
<code>magneticod</code> is designed to be able to use different database engines to store its data, but
currently only SQLite 3 and PostgreSQL 9+ are supported.

#### SQLite

The database file can be found in:

- **On Linux**

      ~/.local/share/magneticod/

<code>magneticod</code> uses write-ahead logging (WAL) for its database, so there might be multiple
files while it is operating, but <code>database.sqlite3</code> is *the database*.

#### More engines (PostgreSQL and others)

You can read about other supported persistence engines [here](pkg/README.md).
  
### Remark About the Network Usage
<code>magneticod</code> does *not* have any built-in rate limiter *yet*, and it will literally suck the hell out of your
bandwidth. Unless you are running <code>magneticod</code> on a separate machine dedicated for it, you might want to consider
starting it manually only when network load is low (e.g. when you are at work or sleeping at night).

Consider passing the flag <code>--indexer-interval=n</code>
with <code>n</code> being a few seconds between operations (more than 1)
