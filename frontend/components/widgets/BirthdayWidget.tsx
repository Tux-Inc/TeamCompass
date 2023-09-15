import { StyleSheet, Text, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { View } from "../Themed";
import React, { useEffect, useState } from "react";
import { getEmployees } from "../../hooks/useEmployees";
import { getEmployee } from "../../hooks/useEmployees";
import {Ionicons} from "@expo/vector-icons";
import i18n from "../../i18n/i18n";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

/* The `BirthdayWidget` function is a React component that renders a birthday widget. */
export default function BirthdayWidget() {
  const colorScheme = useColorScheme() ?? "light";
  const makeStyle = styles(Colors[colorScheme]);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString("default", { month: 'numeric' }).toUpperCase();
  const currentDay = currentDate.toLocaleDateString('fr-FR', { day: 'numeric' });
  const [birthdates, setBirthdates] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [idStrings, setIdStrings] = useState<string[]>([]);
  const [matchingNames, setMatchingNames] = useState<string[]>([]); // Mettre à jour pour stocker les noms correspondants au lieu des anniversaires
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tab_employees = await getEmployees();
        const idStrings = tab_employees.map(item => item.id.toString());
        setIdStrings(idStrings);
        const names = [];
        for (let i = 0; i < idStrings.length; i++) {
          let shouldRetry = true;
          let retryAttempts = 0;
          let birthdatesData;

          while (shouldRetry && retryAttempts < MAX_RETRIES) {
            try {
              birthdatesData = await getEmployee(idStrings[i]);
              shouldRetry = false;
            } catch (error: any) {
                if (error.response && error.response.status === 429) {
                retryAttempts++;
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
              } else {
                shouldRetry = false;
                console.error(error);
              }
            }
          }

          if (birthdatesData && birthdatesData.birth_date) {
            birthdates.push(birthdatesData.birth_date.toString());
            names.push(birthdatesData.name.toString());
          }
        }

        setBirthdates(birthdates);
        setNames(names);
        const matchingNames = names.filter((_, index) => {
          const birthdate = birthdates[index];
          const [year, month, day] = birthdate.split('-');
          return month === currentMonth && day === currentDay;
        });

        setMatchingNames(matchingNames);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [retryCount]);

  return (
    <View style={makeStyle.widgetContainer}>
      <View style={makeStyle.topContainer}>
        <Ionicons name={"gift"} size={12} color={Colors[colorScheme].primaryColor} />
        <Text style={makeStyle.title}>{i18n.t('widgets.birthdays.birthdays').toUpperCase()}</Text>
      </View>
      {matchingNames.length > 0 ? (
        <Text style={makeStyle.birthday_text}>{i18n.t('widgets.birthdays.birthdayToday')} {matchingNames.join(', ')} !</Text>
      ) : (
        <Text style={makeStyle.birthday_text}>{i18n.t('widgets.birthdays.noBirthdayToday')}</Text>
      )}
    </View>
  );
}



const styles = (color: any) =>
  StyleSheet.create({
    widgetContainer: {
      flex: 1,
      display: "flex",
      width: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 15,
      gap: 5,
      borderRadius: 10,
      backgroundColor: color.tintLight,
    },
    topContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: "transparent",
      gap: 5,
    },
    title: {
      fontSize: 12,
      fontWeight: "bold",
      color: color.primaryColor,
    },
    birthday_text: {
      fontSize: 14,
      color: color.tintDark,
    },
  });