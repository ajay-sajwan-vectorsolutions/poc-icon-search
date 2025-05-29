import React, { useEffect, useState, useRef } from "react";
import { fetchData, fetchToken } from "../graphql/query";
import fire from "../utils/firefighter.json";
import law from "../utils/law.json";
import ems from "../utils/ems.json";
// import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";
import "./style.css";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
const DataList = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState({
    family: "",
    style: "",
    id: "",
    color: "#000",
  });

  const fuzzySearch = `
     query {
  search(version: "6.0.0", query: "${keyword}", first: 100) {
    id
    unicode
    familyStylesByLicense {
      free {
        family
        style
      }
      pro {
        family
        style
      }
    }
   
  }
}`;
  const specificIcon = `query {
  release(version: "6.x") {
    icon(name: "${keyword}") {
      id
      unicode
      familyStylesByLicense {
        free {
          family
          style
        }
        pro {
          family
          style
        }
      }
    }
  }
}`;
  let ACCESS_TOKEN = "";
  const search = (type) => {
    setLoading(true);
    setError(null);

    let query = fuzzySearch;
    if (type === "specific") query = specificIcon;

    fetchData(query, ACCESS_TOKEN)
      .then((result) => {
        if (type === "specific") {
          const iconData = result?.data?.release?.icon;
          console.log(iconData);
          setData([iconData]);
        } else {
          const iconData = result?.data?.search;
          setData(iconData);
        }

        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "unauthorized")
          fetchToken().then((res) => {
            ACCESS_TOKEN = res;
            search();
          });

        setError(err);
        setLoading(false);
      });
  };
  const preIcons = {
    fire: fire?.data?.search,
    law: law?.data?.search,
    ems: ems?.data?.search,
  };

  const [defaultIcons, setDefaultIcons] = useState(["fire"]);
  const changeIcon = (e) => {
    if (e.target.checked) {
      setDefaultIcons([...defaultIcons, e.target.value]);
    } else {
      setDefaultIcons(defaultIcons.filter((i) => i !== e.target.value));
    }
  };
  useEffect(() => {
    const getIcons = [];
    defaultIcons?.forEach((i) => {
      getIcons.push(...preIcons[i]);
    });
    setData(getIcons);
  }, [defaultIcons]);
  const saveHandler = () => {
    console.log(selectedIcon);
  };
  return (
    <div className="container">
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <div>
          <input
            type="checkbox"
            id="fire"
            name="fire"
            value="fire"
            checked={defaultIcons.includes("fire")}
            onChange={(e) => changeIcon(e)}
          />
          <label for="fire"> Fire </label>
          <input
            type="checkbox"
            id="law"
            name="law"
            value="law"
            checked={defaultIcons.includes("law")}
            onChange={(e) => changeIcon(e)}
          />
          <label for="law"> law enforcement </label>
          <input
            type="checkbox"
            id="ems"
            name="ems"
            value="ems"
            checked={defaultIcons.includes("ems")}
            onChange={(e) => changeIcon(e)}
          />
          <label for="ems"> ems </label>
        </div>
        <div>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Icon..."
            className="search-input"
          />
          <button onClick={() => search("fuzzy")} className="search-button">
            Fuzzy Search
          </button>
          <button onClick={() => search("specific")} className="search-button">
            Specific icon Search
          </button>
        </div>
      </div>
      {loading && <h1>Loading...</h1>}
      {error && <p>Error: {error.message}</p>}
      <div className="wrapper">
        {data.map((item, index) => (
          <div key={index} className="icons">
            {/* Render FREE styles */}
            <div className="icon-list">
              {item.familyStylesByLicense?.free?.map((style, i) => (
                <div
                  key={`free-${index}-${i}`}
                  className={`iconHolder  `}
                  //   ${
                  //   selectedIcon.id.trim() ===
                  //     `fa-${style.style} fa-${item.id}` &&
                  //   selectedIcon.family === style.family
                  //     ? "selected-icon"
                  //     : ""
                  // }
                >
                  <i
                    onClick={() => {
                      setSelectedIcon({
                        type: "Free",
                        family: style.family,
                        style: style.style,
                        id: `fa-${style.style} fa-${item.id}  `,
                        color: "#000",
                      });
                    }}
                    className={`fa-${style.style} fa-${item.id} icon-class`}
                    style={{ fontSize: "35px", margin: "4px" }}
                  ></i>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#616365",
                    }}
                  >
                    {item.id}

                    <br></br>
                    {selectedIcon.id}
                  </span>
                </div>
              ))}
            </div>
            {/* Render PRO styles */}
            <div className="icon-list">
              {item.familyStylesByLicense?.pro?.map((style, i) => (
                <div
                  key={`pro-${index}-${i}`}
                  className={`iconHolder `}
                  // ${
                  // selectedIcon.id.trim() ===
                  //   `fa-${style.style} fa-${item.id}` &&
                  // selectedIcon.family === style.family
                  //   ? "selected-icon"
                  //   : ""
                  // }
                  //
                >
                  <i
                    onClick={() => {
                      setSelectedIcon({
                        type: "Pro",
                        family: style.family,
                        style: style.style,
                        id: `fa-${style.style} fa-${item.id}  `,
                        color: "#000",
                      });
                    }}
                    className={`fa-${style.style} fa-${item.id} icon-class`}
                    style={{ fontSize: "35px", margin: "4px" }}
                  ></i>{" "}
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#616365",
                    }}
                  >
                    {item.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: " flex-start",
          width: "90%",
        }}
      >
        {selectedIcon.family && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "90%",
                textAlign: "left",
                fontFamily: " Arial, sans-serif",
                fontSize: "16px",
                marginTop: "20px",
              }}
            >
              <span className="pro-font">
                {selectedIcon.type} {selectedIcon.family}-{selectedIcon.style}{" "}
                <br></br> {selectedIcon.id}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              <i
                className={`fa-${selectedIcon?.style} fa-${selectedIcon.id} icon-preview`}
                style={{
                  padding: "24px",
                  fontSize: "48px",
                  margin: "4px",
                  border: "1px solid #ccc",
                  color: selectedIcon?.color,
                }}
              ></i>
              <div style={{ display: "inline-grid", marginLeft: "20px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="color"
                    id="head"
                    name="head"
                    value="#000000"
                    onChange={(e) =>
                      setSelectedIcon({
                        ...selectedIcon,
                        color: e.target.value,
                      })
                    }
                    style={{ width: "26px" }}
                  />
                  <label
                    for="head"
                    style={{
                      width: "auto",
                      marginLeft: "5px",
                      fontSize: "18px",
                    }}
                  >
                    Select Icon color
                  </label>
                </div>
                <button
                  style={{ margin: "20px 0 0 0", width: "50%" }}
                  onClick={() => saveHandler()}
                  className="search-button"
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataList;
