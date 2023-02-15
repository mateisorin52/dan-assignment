import React, { useState } from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const PdfComponent = ({ columns, data }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      marginBottom: 10,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      width: `${100 / columns.length}%`,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      padding: 5,
    },
  });

  return (
    <PDFViewer width={"100%"} height={"100%"}>
      <Document>
        <Page style={styles.page}>
          <Text>Table:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {columns.map((col) => (
                <View key={col} style={styles.tableCol}>
                  <Text>{col}</Text>
                </View>
              ))}
            </View>
            {data.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                {columns.map((col) => (
                  <View key={col} style={styles.tableCol}>
                    <Text>{row[col]}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfComponent;
