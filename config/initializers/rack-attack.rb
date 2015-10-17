class Rack::Attack
  blacklist("block referer spam") do |request|
    spammers = [/floating-share-buttons/, /free-floating/]
    spammers.find { |spammer| request.referer =~ spammer }
  end
end