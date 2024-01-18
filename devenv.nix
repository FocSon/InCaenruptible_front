{ pkgs, ... }:

{
  packages = with pkgs; [
    nodePackages.pnpm
    docker-compose
  ];

  enterShell = ''
    pnpm i
    clear
    pfetch
  '';

  languages.javascript.enable = true;
}
