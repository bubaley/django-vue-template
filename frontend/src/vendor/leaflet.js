export default {
    data: () => ({
        map: null,
        tiles: [
            {
                name: 'Яндекс карты',
                url: 'https://vec{s}.maps.yandex.net/tiles?l=map&v=20.05.27-0&x={x}&y={y}&z={z}&scale=1.25&lang=ru_RU',
                options: {
                    id: 2,
                    subdomains: ['01', '02', '03', '04'],
                    attribution: '<a http="yandex.ru" target="_blank">Яндекс</a>',
                    reuseTiles: true,
                    updateWhenIdle: false,
                }
            },
            {
                name: 'Google карты - спутник',
                url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
                options: {
                    id: 1,
                    subdomains: ['01', '02', '03', '04'],
                    attribution: '<a http="google.com" target="_blank">Google</a>',
                    reuseTiles: true,
                    updateWhenIdle: false
                }
            },
        ]
    }),
    methods: {
        removeLayer(dataLayer) {
            if (this[dataLayer])
                this.map.removeLayer(this[dataLayer])

        },
        /**
         *
         * @param dataLayer - value to storage in data
         * @param layer - result of <name>Layer function
         * @param cluster - should be clusterized
         */
        drawLayer(dataLayer = null, layer = null, cluster = false) {
            this.removeLayer(dataLayer)
            if (cluster) {
                this[dataLayer] = L.markerClusterGroup({chunkedLoading: true})
                this[dataLayer].addLayer(layer)
                this.map.addLayer(this[dataLayer])
            } else {
                this[dataLayer] = layer
                this.map.addLayer(this[dataLayer])
            }
        },
        pointCollection(values, propertiesFunc = null) {
            let geoJson = {
                type: 'FeatureCollection',
                features: [],
            }
            values.forEach(value => {
                if (value.coords && value.coords.length > 0)
                    geoJson.features.push({
                        type: 'Feature',
                        id: value.id,
                        properties: propertiesFunc ? propertiesFunc(value) : {},
                        geometry: {
                            type: 'Point',
                            coordinates: value.coords
                        }
                    })
            })
            return geoJson
        },
        /**
         *
         * @param values
         * @param style
         * @return {{features: [], type: string}}
         */
        polylineCollection(values = [], style = null) {

            let styles = style ? style : {
                weight: 5,
                color: "#0dde00",
                opacity: 1,
            }

            let geoJson = {
                type: 'FeatureCollection',
                features: [],
            }
            values.forEach(value => {
                geoJson.features.push({
                    type: 'Feature',
                    id: value.id,
                    geometry: {
                        type: "LineString",
                        coordinates: value.coords
                    },
                    properties: {
                        style: styles
                    },

                })
            })
            return geoJson
        },
        polygonCollection(values = [], style = {}) {
            const weight = style.weight || 2
            const color = style.color || 'blue'
            const opacity = style.opacity || 0.3
            const fillColor = style.fillColor || style.color || 'blue'
            const fillOpacity = style.fillOpacity || 0.2

            let geoJson = {type: 'FeatureCollection', features: []}
            values.forEach(value => {
                geoJson.features.push({
                    type: 'Feature',
                    id: value.id,
                    properties: {
                        popupContent: 'This is the Auraria West Campus',
                        style: {
                            weight: weight,
                            color: color,
                            opacity: opacity,
                            fillColor: fillColor,
                            fillOpacity: fillOpacity
                        }
                    },
                    geometry: {
                        type: "Polygon",
                        coordinates: [value.coords]
                    }
                })
            })
            return geoJson
        },
        /**
         *
         * @param geojson - result of <name>Collection function
         * @param onClick - function on click
         * @param clr
         * @param icon - icon from https://material.io/resources/icons/?style=baseline
         * @param image - image to show
         * @return {*}
         */
        pointLayer(geojson, onClick = null, clr = null, icon = null, image = null) {
            return L.geoJson(geojson, {
                onEachFeature: (feature, layer) => {
                    if (onClick)
                        layer.on('click', () => onClick(feature, layer))
                },
                pointToLayer: (feature, latlng) => {
                    return this.createPoint(latlng, clr, icon, image, feature)
                },
            })
        },
        createPoint(coords, clr, icon, image, feature = null) {
            let draw_icon
            if (image) {
                draw_icon = new L.icon({
                    iconUrl: image,
                    iconSize: [80, 80],
                })
            } else {
                let color = clr
                let _icon = icon
                if (typeof clr === 'function') {
                    color = clr(feature)
                }
                if (typeof icon === 'function') {
                    _icon = icon(feature)
                }
                draw_icon = new L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: ${color}"
                                    class="marker-pin"></div><i class="material-icons" style="color: ${color}">${_icon}</i>`,
                    iconSize: [30, 42],
                    iconAnchor: [15, 42]
                })
            }
            return L.marker(coords, {
                icon: draw_icon
            })
        },
        polygonLayer(geojson, onClick = null) {
            return L.geoJson(geojson, {
                onEachFeature: (feature, layer) => {
                    if (onClick) {
                        layer.on('click', () => onClick(feature.id))
                    }
                },
                style: function (feature) {
                    return feature.properties && feature.properties.style;
                },
            })
        },
        initMap(coords = [54.521308, 21.327832], zoom) {
            let tiles = {}
            this.tiles.forEach(value => {
                tiles[value.name] = L.tileLayer(value.url, value.options)
            })
            this.map = L.map('map', {
                center: coords,
                zoom: zoom,
                layers: [tiles[this.tiles[0].name]]
            })
            this.map.options.crs = L.CRS.EPSG3395

            L.control.layers(tiles).addTo(this.map)

            this.map.on('baselayerchange', (e) => {
                let center = this.map.getCenter()
                if (e.name === 'Яндекс карты') {
                    this.map.options.crs = L.CRS.EPSG3395
                } else {
                    this.map.options.crs = L.CRS.EPSG3857
                }
                this.map._resetView(center, this.map.getZoom())
            })
        },

        setMapCenter(lat, lng, zoom = null) {
            if (!zoom)
                zoom = this.map.getMaxZoom()
            this.map.flyTo([lat, lng], this.map.getMaxZoom(), {
                duration: 0.5
            })
        },
        setMapBounds(coords) {
            this.map.flyToBounds(coords.getBounds(), {
                duration: 0.5
            })
        },
    },
}
