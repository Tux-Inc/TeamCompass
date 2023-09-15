import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    useColorScheme,
    View,
    Text,
    ScrollView,
    TouchableOpacity, Linking,
} from 'react-native';
import Colors from '../../constants/Colors';
import i18n from '../../i18n/i18n';
import axios from 'axios';

export default function NewsScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const makeStyle = styles(Colors[colorScheme]);

    const [newsData, setNewsData] = useState([]);

    const fetchNewsData = async () => {
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.EXPO_PUBLIC_NEWS_API_TOKEN}`
            );

            setNewsData(response.data.articles);
        } catch (error) {
            console.error('Erreur lors de la récupération des actualités :', error);
        }
    };

    const openNewsArticle = (url: string) => {
        Linking.openURL(url);
    }

    useEffect(() => {
        fetchNewsData();
    }, []);

    return (
        <View style={makeStyle.container}>
            <View style={makeStyle.header}>
                <Text style={makeStyle.headerText}>{i18n.t('layout.news')}</Text>
            </View>
            <ScrollView style={makeStyle.scrollContainer}>
                <View style={makeStyle.section}>
                    {newsData.map((newsItem: any, index) => (
                        <TouchableOpacity
                            key={index}
                            style={makeStyle.newsItem}
                            onPress={() => {
                                openNewsArticle(newsItem.url)
                            }}
                        >
                            <Text style={makeStyle.newsTitle}>{newsItem.title}</Text>
                            <Text style={makeStyle.newsDescription}>
                                {newsItem.description}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={makeStyle.section}>
                    {newsData.map((newsItem: any, index) => (
                        <TouchableOpacity
                            key={index}
                            style={makeStyle.newsItem}
                            onPress={() => {
                                openNewsArticle(newsItem.url)
                            }}
                        >
                            <Text style={makeStyle.newsTitle}>{newsItem.title}</Text>
                            <Text style={makeStyle.newsDescription}>
                                {newsItem.description}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 80,
            paddingHorizontal: 20,
            backgroundColor: color.background,
            width: '100%',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        headerText: {
            fontSize: 32,
            fontWeight: 'bold',
            color: color.primaryColor,
        },
        scrollContainer: {
            flex: 1,
            paddingHorizontal: 15,
            paddingTop: 15,
        },
        section: {
            marginBottom: 20,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        newsItem: {
            backgroundColor: color.tintLight,
            borderRadius: 8,
            padding: 12,
            marginBottom: 10,
            elevation: 2,
        },
        newsTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5,
            color: color.primaryColor,
        },
        newsDescription: {
            fontSize: 16,
            color: color.tintDark,
        },
    });
