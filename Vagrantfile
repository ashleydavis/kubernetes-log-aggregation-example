# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.network "forwarded_port", guest: 80, host: 8000
  config.vm.provision "shell", path: "./scripts/dev/provision-dev-vm.sh"
end
