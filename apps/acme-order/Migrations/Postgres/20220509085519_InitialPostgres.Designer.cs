﻿// <auto-generated />

using System;
using System.Collections.Generic;
using AcmeOrder.Db;
using AcmeOrder.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AcmeOrder.Migrations.Postgres
{
    [DbContext(typeof(PostgresOrderContext))]
    [Migration("20220509085519_InitialPostgres")]
    partial class InitialPostgres
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:PostgresExtension:uuid-ossp", ",,")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.24")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("AcmeOrder.Models.Order", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("uuid")
                        .HasDefaultValueSql("uuid_generate_v4()");

                    b.Property<Address>("Address")
                        .HasColumnName("address")
                        .HasColumnType("json");

                    b.Property<Card>("Card")
                        .HasColumnName("card")
                        .HasColumnType("json");

                    b.Property<ICollection<Cart>>("Cart")
                        .HasColumnName("cart")
                        .HasColumnType("json");

                    b.Property<DateTime?>("Date")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("date")
                        .HasColumnType("timestamp without time zone")
                        .HasDefaultValue(new DateTime(2022, 5, 9, 8, 55, 19, 197, DateTimeKind.Unspecified).AddTicks(5020));

                    b.Property<string>("Delivery")
                        .HasColumnName("delivery")
                        .HasColumnType("character varying(1000)")
                        .HasMaxLength(1000);

                    b.Property<string>("Email")
                        .HasColumnName("email")
                        .HasColumnType("character varying(1000)")
                        .HasMaxLength(1000);

                    b.Property<string>("Firstname")
                        .HasColumnName("firstname")
                        .HasColumnType("character varying(1000)")
                        .HasMaxLength(1000);

                    b.Property<string>("Lastname")
                        .HasColumnName("lastname")
                        .HasColumnType("character varying(1000)")
                        .HasMaxLength(1000);

                    b.Property<string>("Paid")
                        .HasColumnName("paid")
                        .HasColumnType("character varying(1000)")
                        .HasMaxLength(1000);

                    b.Property<string>("Total")
                        .HasColumnName("total")
                        .HasColumnType("character varying(1000)")
                        .HasMaxLength(1000);

                    b.Property<string>("UserId")
                        .HasColumnName("user_id")
                        .HasColumnType("character varying(1000)")
                        .HasMaxLength(1000);

                    b.HasKey("Id");

                    b.ToTable("order");
                });
#pragma warning restore 612, 618
        }
    }
}
