#!/bin/bash
set -e

OPTIONS_PATH=/data/options.json
GITUPDATE=$(jq --raw-output ".gitupdate" $OPTIONS_PATH)
NPMUPDATE=$(jq --raw-output ".npmupdate" $OPTIONS_PATH)
NPMINSTALL=$(jq --raw-output ".npminstall" $OPTIONS_PATH)

# Location of HASS configuration map to home assistant configuration
HASS_CONFIG=/config

# Location where the git install is located in the docker container.
MIRROR_APP_PATH=/opt/magic_mirror

# Default location for Magic Mirror Configuration in the home assistant configuration folder.
MM_CONFIG_ROOT=$HASS_CONFIG/magicmirror

# config and modules for the magic mirror server. Allows simple user extension of modules and configuration.
MM_CONF_PATH=$MM_CONFIG_ROOT/config
MM_MODULES_PATH=$MM_CONFIG_ROOT/modules
MM_CSS_PATH=$MM_CONFIG_ROOT/css

# Check for install, if not found major issue. 
if [ ! -d "$MIRROR_APP_PATH" ]; then
    echo "[ERROR] Magic Mirror not found!!"
    mkdir -p "$MIRROR_APP_PATH"
    cd "$MIRROR_APP_PATH"
    git clone --depth 1 -b master https://github.com/MichMich/MagicMirror.git . 
else
    echo "[INFO] Magic Mirror already installed"
fi

cd "$MIRROR_APP_PATH"


# Check for config and module and create if needed.
if [ ! -d "$MM_CONF_PATH" ]; then
    echo "[INFO] Creating Configuration Path at $MM_CONF_PATH"
    mkdir -p "$MM_CONF_PATH"
else
    echo "[INFO] Magic Mirror configuration folder exists @ $MM_CONF_PATH"
fi

if [ ! -d "$MM_MODULES_PATH" ]; then
    echo "[INFO] Creating Module Path at $MM_MODULES_PATH"
    mkdir -p "$MM_MODULES_PATH"
else
    echo "[INFO] Magic Mirror module folder exists @ $MM_MODULES_PATH"
fi

if [ ! -d "$MM_CSS_PATH" ]; then
    echo "[INFO] Creating css Path at $MM_CSS_PATH"
    mkdir -p "$MM_CSS_PATH"
else
    echo "[INFO] Magic Mirror css folder exists @ $MM_CSS_PATH"
fi

if [ ! -f "$MM_CONF_PATH/config.js" ]; then
    echo "[INFO] Creating default configuration file."
    cp "$MIRROR_APP_PATH/config/config.js.sample" "$MM_CONF_PATH/config.js"
else
    echo "[INFO] Magic Mirror configuration exists"
fi


# Copy over the default configuration and modules
# TODO: make a option to enable and disable this. 
echo "[INFO] Copying configuration and modules"
cp -Rf $MM_CONFIG_ROOT/modules $MIRROR_APP_PATH
cp -Rf $MM_CONFIG_ROOT/config $MIRROR_APP_PATH
cp -Rf $MM_CONFIG_ROOT/css $MIRROR_APP_PATH

# Versions for debugging if needed.
NODE_CURRENT=$(node -v)
echo "[INFO] Node Version: $NODE_CURRENT"
NPM_CURRENT=$(npm -v)
echo "[INFO] NPM Version: $NPM_CURRENT"

# GIT Update
if [ "$GITUPDATE" == "true" ];
then
    echo "[INFO] Updating Magic Mirror install"
    git pull
fi

#NPM Update
if [ "$NPMUPDATE" == "true" ];
then
    echo "[INFO] Updating NPM to latest"
    npm i npm@latest -g
    NPM_CURRENT=$(npm -v)
    echo "[INFO] NPM Version: $NPM_CURRENT"
fi

# NPM Install
if [ "$NPMINSTALL" == "true" ];
then
    echo "[INFO] Running NPM Install"
    if npm install --unsafe-perm --silent; then 
        echo "[INFO] Dependencies installation Done!"
    else
        echo "[ERROR] Unable to install dependencies!"
        exit 1
    fi
fi

echo "[INFO] Installing configured modules"
jq -r '.modules[] | .name + " " + .git' $OPTIONS_PATH |
while read name git; do
    echo "[INFO] Checking - $name @ $git"
    if [ ! -d "$MIRROR_APP_PATH/modules/$name" ]; then
        echo "[INFO] Installing - $name @ $git"
        cd $MIRROR_APP_PATH/modules
        git clone --depth 1 $git
        cd $name/
        npm install --unsafe-perm --silent
    else
        echo "[INFO] Skipping - $name @ $git"
    fi    
done

# Check the configuration
npm run config:check
if [ $? -eq 0 ]
then
    echo "[INFO] Magic Mirror configuration is valid"
else
    echo "[ERROR] Magic Mirror configuration is invalid"
    exit 1
fi

echo "[INFO] Starting server only process in container"
node serveronly
