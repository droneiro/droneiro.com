# View Middleman configurations:
# http://localhost:4567/__middleman/config/

# Slim HTML
# ----------------------------------------------
::Slim::Engine.set_options :format  => :html

# i18n
# ----------------------------------------------
activate :i18n, :mount_at_root => :pt

# Livereload
# ----------------------------------------------
configure :development do
  activate :livereload, :no_swf => true
end

# Webpack
# ----------------------------------------------
activate :external_pipeline,
  name: :webpack,
  command: build? ?  "yarn run build" : "yarn run start",
  source: ".tmp/dist",
  latency: 1

# Configure assets directories
# ----------------------------------------------
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'

# Other configurations
# ----------------------------------------------
set :trailing_slash, false

# Medium Articles
a = `curl 'https://medium.com/droneiro-com?format=json' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-US,en;q=0.9,pt;q=0.8' -H 'upgrade-insecure-requests: 1' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' -H 'cache-control: max-age=0' -H 'authority: medium.com' -H 'cookie: __cfduid=d9b1fa32bd1e07f86a81e8b0304c0b2581503411798; uid=b024372e1bfd; sid=1:i5/jXvjYkcx2kpwcEEcmrERTat0v2j3Av22fyFMeXImd6YWkKjMwYWZM4dnxMIfB; _ga=GA1.2.1012276217.1503433422; lightstep_guid/medium-web=9dfe9cf0f9e8c48a; lightstep_session_id=880b0f9b4ad61e86; pr=2; tz=120; _gid=GA1.2.987653558.1515648039; sz=1920; xsrf=40EmmgaFRmkyJU5b; cf_clearance=18f219d9eb1b66c236423e677cdbf25f7f2f673f-1515807360-10800; _gat=1' --compressed`
a.slice! "])}while(1);</x>"
File.open("data/medium.yml","w") do |file|
  file.write JSON.parse(a).to_yaml
end

# Sitemap
# ----------------------------------------------
page "/sitemap.xml", :layout => false

# Redirects
# ----------------------------------------------
redirect "registros.html", to: 'https://registro.droneiro.com/'
redirect "cadastro.html", to: 'https://registro.droneiro.com/cadastro'

# Development-specific configuration
# ----------------------------------------------
configure :development do
  activate :directory_indexes

  set :debug_assets, true

  # Output a pretty html
  ::Slim::Engine.set_options :pretty => true
end

# Build-specific configuration
# ----------------------------------------------
configure :build do
  # Use relative URLs
  activate :directory_indexes

  # Add asset fingerprinting to avoid cache issues
  activate :asset_hash
end
