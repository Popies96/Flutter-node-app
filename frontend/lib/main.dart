import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:frontend/item.dart';
import "package:http/http.dart" as http;
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  final serverUrl = 'http://10.0.2.2:3000';

  Future<List<Item>> fetchItems () async {
    final response = await http.get(Uri.parse('$serverUrl/api/items'));
    if (response.statusCode == 200){
      final  List<dynamic> itemsList = jsonDecode(response.body);
      final List<Item> items = itemsList.map((item) {
        return Item.fromJson(item);
      }).toList();
      return items;
    }else{
      
      throw Exception("error");
    }

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child:  Column(
        children: [
          FutureBuilder( future: fetchItems(),builder: (context , snapshot) {
            if (snapshot.hasData){
              return ListView.builder(
                shrinkWrap: true,
                itemCount: snapshot.data!.length
                ,itemBuilder: (context , index) {
                  final item = snapshot.data![index];
                  return ListTile(
                    title: Text(item.name),
                  );

                });
            }else if (snapshot.hasError){
              print(snapshot.error);
              return Center(child: Text(snapshot.error.toString()));
              
            }else {
              return CircularProgressIndicator();
            }
          })
        ],
      )),

      
    );
  }
}
