rm mysnap*.snap
rm -r parts/ stage/ prime/
snapcraft --destructive-mode
#snap install mysnap*.snap --devmode