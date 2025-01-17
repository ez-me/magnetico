# magneticow
*Lightweight web interface for <code>magneticod</code>.*

<code>magneticow</code> is a lightweight web interface to search and to browse the torrents that its counterpart (<code>magneticod</code>)
discovered.

See the list of [alternative front-ends](https://github.com/boramalper/magnetico/wiki/Related-Projects#alternative-front-ends)
developed by the community if you need something more advanced or different.

## Installation
### Installing the Pre-Compiled Static Binary
You can find the latest pre-compiled static binaries on [GitHub](https://github.com/ez-me/magnetico/releases)
for versions from v0.12.0 onwards. 

### Compiling yourself

If you can't run the release binaries provided by me, just follow the usual clone and make.
Keep in mind you require [go-bindata](https://github.com/kevinburke/go-bindata).

```bash
git clone --depth=1 https://github.com/ez-me/magnetico.git
cd magnetico
make magneticow
```

## Setup
### Configuration
Configuration file can be found at:

- **On Linux**

      ~/.config/magneticow/configuration.toml

### Setting Password-Protection
If you'd like to password-protect the access to <code>magneticow</code>, you need to store the credentials
in this file

- **On Linux:**

      ~/.config/magneticow/credentials

      
`credentials` file must consist of lines of the following format

    <USERNAME>:<BCRYPT HASH>
    
where

- `<USERNAME>` must start with a small-case (`[a-z]`) ASCII character, might contain non-consecutive
  underscores except at the end, and consists of small-case a-z characters and digits 0-9.
- `<BCRYPT HASH>` is the output of the well-known bcrypt function.

You can use `htpasswd` (part of `apache2-utils` on Ubuntu) to create lines:

```
$  htpasswd -bnBC 12 "USERNAME" "PASSWORD"
USERNAME:$2y$12$YE01LZ8jrbQbx6c0s2hdZO71dSjn2p/O9XsYJpz.5968yCysUgiaG
```

### Warnings
1. **magnetico** currently does NOT have any filtering system NOR it allows individual torrents to be removed from the
   database, and BitTorrent DHT network is full of the materials that are considered illegal in many countries.
   If you are afraid of the legal consequences, or simply morally against (indirectly) assisting those content to spread around,
   follow the <code>magneticow</code> installation instructions carefully to password-protect the web-interface from others.
   
2. <code>magneticow</code> uses HTTP Basic Authentication, meaning that your username and password will be
   transmitted in plain-text for every request. Configuring <code>magneticow</code> to serve behind a
   web-server with HTTPS enabled is strongly recommended, but unfortunately not described here. You
   can use [Let's Encrypt](https://letsencrypt.org/) to get a certificate for free.

3. <code>magneticow</code> is *NOT* designed to scale, and will fail miserably if you try to use it like a public torrent
   website. This is a *deliberate* technical decision, not a bug or something to be fixed; *another* web interface with
   more features to support such use cases and scalability *might* be developed, but <code>magneticow</code> will NEVER be the
   case.

## Usage
### Searching
* Only the **titles** of the torrents are being searched.
* Search is case-insensitive.
* Titles that includes terms that are separated by space are returned from the search:

  Example: ``king bad`` returns ``Stephen King - The Bazaar of Bad Dreams``

  * If you would like terms to appear in the exact order you wrote them, enclose them in double quotes:

    Example: ``"king bad"`` returns ``George Benson - Good King Bad``
* Use asteriks (``*``) to denote prefixes:

  Example: ``The Godf*`` returns ``Francis Ford Coppola - The Godfather``

  Asteriks works inside the double quotes too!
* Use caret (``^``) to indicate that the term it prefixes must be the first word in the title:

  Example: ``linux`` returns ``Arch Linux`` while ``^linux`` would return ``Linux Mint``

  * Caret works **inside** the double quotes **but not outside**:

    Right: ``"^ubuntu linux"``

    Wrong: ``^"ubuntu linux"``
* You can use ``AND``, ``OR`` and ``NOT`` and also parentheses for more complex queries:

  Example: ``programming NOT (windows OR "os x" OR macos)``

  Beware that the terms are all-caps and MUST be so.

| Operator | Syntax Precedence                       |
|----------|-----------------------------------------|
| `NOT`    | Highest precedence (tightest grouping). |
| `AND`    |                                         |
| `OR`     | Lowest precedence (loosest grouping).   |

### REST-ful HTTP API

<code>magneticow</code> offers a REST-ful HTTP API that is capable of everything the web interface can do. 

See the [API documentation on Swaggerhub](https://app.swaggerhub.com/apis/boramalper/magneticow-api/v0.1).
