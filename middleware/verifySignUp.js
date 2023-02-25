const path = require("path");
const fileName = path.basename(__filename);

const db = require("../models");
const User = db.User;
const Admin = db.Admin;

const { consoleError } = require("../helpers");

const arrayUserReserved = [
  "about",
  "aaaa",
  "aaaaa",
  "access",
  "account",
  "accounts",
  "add",
  "address",
  "adm",
  "admin",
  "administration",
  "adult",
  "advertising",
  "affiliate",
  "affiliates",
  "ajax",
  "analytics",
  "android",
  "anon",
  "anonymous",
  "api",
  "app",
  "apps",
  "archive",
  "atom",
  "auth",
  "authentication",
  "avatar",
  "backup",
  "banner",
  "banners",
  "bbbb",
  "bbbbb",
  "beta",
  "billing",
  "bin",
  "blog",
  "blogs",
  "board",
  "bot",
  "bots",
  "business",
  "cache",
  "cadastro",
  "calendar",
  "campaign",
  "careers",
  "cccc",
  "ccccc",
  "cgi",
  "chat",
  "client",
  "cliente",
  "code",
  "comercial",
  "compare",
  "compras",
  "config",
  "connect",
  "contact",
  "contest",
  "create",
  "css",
  "dashboard",
  "data",
  "db",
  "dddd",
  "ddddd",
  "delete",
  "demo",
  "design",
  "designer",
  "dev",
  "devel",
  "dir",
  "directory",
  "doc",
  "docs",
  "domain",
  "download",
  "downloads",
  "ecommerce",
  "edit",
  "editor",
  "eeee",
  "eeeee",
  "email",
  "faq",
  "favorite",
  "feed",
  "feedback",
  "ffff",
  "fffff",
  "file",
  "files",
  "flog",
  "follow",
  "forum",
  "forums",
  "free",
  "ftp",
  "gadget",
  "gadgets",
  "games",
  "gggg",
  "ggggg",
  "group",
  "groups",
  "guest",
  "help",
  "hhhh",
  "hhhhh",
  "home",
  "homepage",
  "host",
  "hosting",
  "hostname",
  "hpg",
  "html",
  "http",
  "httpd",
  "https",
  "iiii",
  "iiiii",
  "image",
  "images",
  "imap",
  "img",
  "index",
  "indice",
  "info",
  "information",
  "intranet",
  "invite",
  "ipad",
  "iphone",
  "irc",
  "java",
  "javascript",
  "jjjj",
  "jjjjj",
  "job",
  "jobs",
  "js",
  "kkkk",
  "kkkkk",
  "knowledgebase",
  "list",
  "lists",
  "llll",
  "lllll",
  "log",
  "login",
  "logout",
  "logs",
  "mail",
  "mail1",
  "mail2",
  "mail3",
  "mail4",
  "mail5",
  "mailer",
  "mailing",
  "manager",
  "marketing",
  "master",
  "me",
  "media",
  "message",
  "messenger",
  "microblog",
  "microblogs",
  "mine",
  "mmmm",
  "mmmmm",
  "mob",
  "mobile",
  "movie",
  "movies",
  "mp3",
  "msg",
  "msn",
  "music",
  "musicas",
  "mx",
  "my",
  "mysql",
  "name",
  "named",
  "net",
  "network",
  "new",
  "news",
  "newsletter",
  "nick",
  "nickname",
  "nnnn",
  "nnnnn",
  "notes",
  "noticias",
  "ns",
  "ns1",
  "ns10",
  "ns2",
  "ns3",
  "ns4",
  "ns5",
  "ns6",
  "ns7",
  "ns8",
  "ns9",
  "old",
  "online",
  "oooo",
  "ooooo",
  "operator",
  "order",
  "orders",
  "page",
  "pager",
  "pages",
  "panel",
  "password",
  "perl",
  "photo",
  "photoalbum",
  "photos",
  "php",
  "pic",
  "pics",
  "plugin",
  "plugins",
  "pop",
  "pop3",
  "post",
  "postfix",
  "postmaster",
  "posts",
  "pppp",
  "ppppp",
  "profile",
  "project",
  "projects",
  "promo",
  "pub",
  "public",
  "python",
  "qqqq",
  "qqqqq",
  "random",
  "register",
  "registration",
  "root",
  "rrrr",
  "rrrrr",
  "rss",
  "ruby",
  "sale",
  "sales",
  "sample",
  "samples",
  "script",
  "scripts",
  "search",
  "secure",
  "security",
  "send",
  "service",
  "setting",
  "settings",
  "setup",
  "sex",
  "sexo",
  "shop",
  "signin",
  "signup",
  "site",
  "sitemap",
  "sites",
  "smtp",
  "soporte",
  "sql",
  "ssh",
  "ssss",
  "sssss",
  "stage",
  "staging",
  "start",
  "stat",
  "static",
  "stats",
  "status",
  "store",
  "stores",
  "subdomain",
  "subscribe",
  "suporte",
  "support",
  "system",
  "tablet",
  "tablets",
  "talk",
  "task",
  "tasks",
  "tech",
  "telnet",
  "test",
  "test1",
  "test2",
  "test3",
  "teste",
  "tests",
  "theme",
  "themes",
  "tucano",
  "tucan",
  "tucana",
  "tmp",
  "todo",
  "tools",
  "tttt",
  "ttttt",
  "tv",
  "update",
  "upload",
  "url",
  "usage",
  "user",
  "username",
  "usuario",
  "uuuu",
  "uuuuu",
  "vendas",
  "video",
  "videos",
  "visitor",
  "vvvv",
  "vvvvv",
  "web",
  "webmail",
  "webmaster",
  "website",
  "websites",
  "win",
  "workshop",
  "ww",
  "wws",
  "www",
  "www1",
  "www2",
  "www3",
  "www4",
  "www5",
  "www6",
  "www7",
  "wwws",
  "wwww",
  "wwwww",
  "wwwwww",
  "xpg",
  "xxx",
  "xxxx",
  "xxxxx",
  "you",
  "yourdomain",
  "yourname",
  "yoursite",
  "yourusername",
  "yyyy",
  "yyyyy",
  "zzzz",
  "zzzzz",
];

checkDuplicate = (req, res, next) => {
  const { email, username, phoneNumber } = req.body.values;

  // Username
  return User.findOne({
    where: {
      username,
    },
  })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: "Username already in use",
        });
      } else {
        // Username in Admin
        return Admin.findOne({
          where: {
            username,
          },
        })
          .then((admin) => {
            if (admin) {
              res.status(400).send({
                message: "Username already in use",
              });
            } else {
              // Email
              return User.findOne({
                where: {
                  email: email,
                },
              })
                .then((user) => {
                  if (user) {
                    // Email already exist, maybe user hasn't confirmed

                    if (user.emailConfirmed) {
                      // Email already confirmed, so is already in use

                      res.status(400).send({
                        message: "Email already in use",
                        flag: "CONFIRMED",
                      });
                    } else {
                      // Email already confirmed, so is already in use
                      res.status(403).send({
                        message: "Email already in use, but not confirmed yet",
                        flag: "NOT_CONFIRMED",
                        userId: user.id,
                      });
                    }
                  } else {
                    // Phone number
                    return User.findOne({
                      where: {
                        phoneNumber,
                      },
                    })
                      .then((phoneNumber) => {
                        if (phoneNumber) {
                          res.status(400).send({
                            message: "Phone number already in use",
                          });
                        } else {
                          let found = arrayUserReserved.find(
                            (usrnm) => usrnm === username
                          );

                          if (found) {
                            res.status(400).send({
                              message: "Choose another username",
                            });
                          } else {
                            next();
                          }
                        }
                      })
                      .catch((error) => {
                        consoleError(fileName, arguments.callee.name, error);
                        res.status(400).send({ message: error.message });
                      });
                  }
                })
                .catch((error) => {
                  consoleError(fileName, arguments.callee.name, error);
                  res.status(400).send({ message: error.message });
                });
            }
          })
          .catch((error) => {
            consoleError(fileName, arguments.callee.name, error);
            res.status(400).send({ message: error.message });
          });
      }
    })
    .catch((error) => {
      consoleError(fileName, arguments.callee.name, error);
      res.status(400).send({ message: error.message });
    });
};

const verifySignUp = {
  checkDuplicate,
};

module.exports = verifySignUp;
